<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

session_start();
require_once __DIR__ . "/../../config/db.php";

$data = json_decode(file_get_contents("php://input"));

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

if (!empty($data->task_id) && !empty($data->task)) {
    $task_id = $data->task_id;
    $task = $data->task;

    $stmt = $conn->prepare("UPDATE tasks SET task = ? WHERE id = ?");
    $stmt->bind_param("si", $task, $task_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update task"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing task ID or new task text"]);
}
?>
