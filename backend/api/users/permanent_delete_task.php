<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

session_start();
require_once __DIR__ . "/../../config/db.php";

$data = json_decode(file_get_contents("php://input"));

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

if (!empty($data->task_id)) {
    $task_id = $data->task_id;
    $user_id = $_SESSION["user_id"];
    
    // Permanently delete the task
    $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ? AND user_id = ? AND is_archived = 1");
    $stmt->bind_param("ii", $task_id, $user_id);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Task permanently deleted"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to delete task: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid task ID"]);
}
?>