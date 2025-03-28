<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true"); // 🔥 This is the missing line


session_start();
require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"));

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

if (!empty($data->task_id) && !empty($data->status)) {
    $task_id = $data->task_id;
    $status = $data->status;
    $user_id = $_SESSION["user_id"];

    $stmt = $conn->prepare("UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?");
    $stmt->bind_param("sii", $status, $task_id, $user_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Task updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update task"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid data"]);
}
?>
