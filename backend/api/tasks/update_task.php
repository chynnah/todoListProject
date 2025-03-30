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

if (!empty($data->task_id)) {
    $task_id = $data->task_id;

    if (isset($data->status)) {
        // Update status (Completed & Pending)
        $stmt = $conn->prepare("UPDATE tasks SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $data->status, $task_id);
    } elseif (isset($data->is_favorite)) {
        // Toggle Favorite
        $stmt = $conn->prepare("UPDATE tasks SET is_favorite = ? WHERE id = ?");
        $stmt->bind_param("ii", $data->is_favorite, $task_id);
    }

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Update failed"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Missing task ID"]);
}
?>
