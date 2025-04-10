<?php 
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true"); 

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

    // Restore the task (set 'archived' to 0)
    $stmt = $conn->prepare("UPDATE tasks SET archived = 0 WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $task_id, $user_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Task restored successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to restore task"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid task ID"]);
}
?>
