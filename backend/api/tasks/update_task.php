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
    $task = $data->task ?? null; 
    $status = $data->status ?? null;
    $category_id = $data->category_id ?? null;
    $is_favorite = isset($data->is_favorite) ? $data->is_favorite : null;


    if ($category_id !== null) {
        $stmt = $conn->prepare("UPDATE tasks SET task = ?, category_id = ?, status = ?, updated_at = NOW() WHERE id = ?");
        $stmt->bind_param("sssi", $task, $category_id, $status, $task_id);
    } elseif ($is_favorite !== null) {
        $stmt = $conn->prepare("UPDATE tasks SET is_favorite = ?, updated_at = NOW() WHERE id = ?");
        $stmt->bind_param("ii", $is_favorite, $task_id);
    } elseif ($status !== null) {
        $stmt = $conn->prepare("UPDATE tasks SET status = ?, updated_at = NOW() WHERE id = ?");
        $stmt->bind_param("si", $status, $task_id);
    } else {
        $stmt = $conn->prepare("UPDATE tasks SET task = ?, updated_at = NOW() WHERE id = ?");
        $stmt->bind_param("si", $task, $task_id);
    }

    // Execute the prepared statement
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Update failed"]);
    }
}
?>
