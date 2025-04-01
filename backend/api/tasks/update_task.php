<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

session_start();
require_once __DIR__ . "/../../config/db.php";

$data = json_decode(file_get_contents("php://input"));
if (!empty($data->task_id)) {
    $task_id = $data->task_id;

    if (isset($data->status)) {
        $stmt = $conn->prepare("UPDATE tasks SET status = ?, updated_at = NOW() WHERE id = ?");
        $stmt->bind_param("si", $data->status, $task_id);
    } elseif (isset($data->is_favorite)) {
        $stmt = $conn->prepare("UPDATE tasks SET is_favorite = ?, updated_at = NOW() WHERE id = ?");
        $stmt->bind_param("ii", $data->is_favorite, $task_id);
    }
    

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Update failed"]);
    }
}