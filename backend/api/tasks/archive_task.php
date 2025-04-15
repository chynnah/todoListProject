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

$data = json_decode(file_get_contents("php://input"));

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

if (!empty($data->task_id)) {
    $task_id = $data->task_id;
    $user_id = $_SESSION["user_id"];
    $archived_at = date('Y-m-d H:i:s');
    
    // Update the task to mark it as archived
    $stmt = $conn->prepare("UPDATE tasks SET is_archived = 1, archived_at = ? WHERE id = ? AND user_id = ?");
    $stmt->bind_param("sii", $archived_at, $task_id, $user_id);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Task archived successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to archive task: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid task ID"]);
}
?>