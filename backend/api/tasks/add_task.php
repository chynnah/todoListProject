<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

session_start();
require_once __DIR__ . "/../../config/db.php";

$data = json_decode(file_get_contents("php://input"));

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit;
}

if (!empty($data->task) && !empty($data->category_id)) {
    $task = htmlspecialchars(strip_tags($data->task));
    $category_id = intval($data->category_id);
    $user_id = $_SESSION["user_id"];

    $stmt = $conn->prepare("INSERT INTO tasks (user_id, task, category_id) VALUES (?, ?, ?)");
    $stmt->bind_param("isi", $user_id, $task, $category_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Task added successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add task"]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Task and category are required"]);
}

if (empty($data->task) || empty($data->category_id)) {
    echo json_encode(["success" => false, "message" => "Task and category are required"]);
    exit;
}