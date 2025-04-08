<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

session_start();
require_once __DIR__ . "/../../config/db.php";

$data = json_decode(file_get_contents("php://input"));

$task_id = $data->task_id;
$task = $data->task;
$category_id = $data->category_id;
$deadline = $data->deadline;

$query = "UPDATE tasks SET task = ?, category_id = ?, deadline = ? WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("sisi", $task, $category_id, $deadline, $task_id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update task"]);
}

$stmt->close();
$conn->close();



        
