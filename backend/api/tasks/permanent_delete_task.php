<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

session_start();
require_once __DIR__ . "/../../config/db.php";

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Log the incoming request for debugging
error_log("Permanent delete request received: " . file_get_contents("php://input"));

$data = json_decode(file_get_contents("php://input"));

if (!isset($_SESSION["user_id"])) {
    error_log("Unauthorized access attempt - no user_id in session");
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

if (!empty($data->task_id)) {
    $task_id = $data->task_id;
    $user_id = $_SESSION["user_id"];
    
    // Log the operation
    error_log("Attempting to permanently delete task_id: $task_id for user_id: $user_id");
    
    // First check if the task exists and is archived
    $check_stmt = $conn->prepare("SELECT id, task FROM tasks WHERE id = ? AND user_id = ? AND is_archived = 1");
    $check_stmt->bind_param("ii", $task_id, $user_id);
    $check_stmt->execute();
    $result = $check_stmt->get_result();
    
    if ($result->num_rows === 0) {
        error_log("Task not found or not archived - task_id: $task_id, user_id: $user_id");
        echo json_encode(["success" => false, "message" => "Task not found or not archived"]);
        $check_stmt->close();
        exit;
    }
    
    $task_data = $result->fetch_assoc();
    error_log("Found task to delete: " . $task_data['task']);
    $check_stmt->close();
    
    // Now permanently delete the task from the database
    $delete_stmt = $conn->prepare("DELETE FROM tasks WHERE id = ? AND user_id = ? AND is_archived = 1");
    $delete_stmt->bind_param("ii", $task_id, $user_id);
    
    if ($delete_stmt->execute()) {
        if ($delete_stmt->affected_rows > 0) {
            error_log("Task permanently deleted successfully - task_id: $task_id");
            echo json_encode(["success" => true, "message" => "Task permanently deleted successfully"]);
        } else {
            error_log("No rows affected during delete - task_id: $task_id");
            echo json_encode(["success" => false, "message" => "Failed to delete task - no rows affected"]);
        }
    } else {
        error_log("Database error during delete: " . $conn->error);
        echo json_encode(["success" => false, "message" => "Failed to delete task: " . $conn->error]);
    }
    
    $delete_stmt->close();
} else {
    error_log("Invalid task ID received: " . (isset($data->task_id) ? $data->task_id : 'null'));
    echo json_encode(["success" => false, "message" => "Invalid task ID"]);
}

$conn->close();
?>