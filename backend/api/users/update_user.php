<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

session_start();
require_once __DIR__ . "/../../config/db.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id) && (!empty($data->username) || !empty($data->email))) {
    $id = htmlspecialchars(strip_tags($data->id));
    $username = !empty($data->username) ? htmlspecialchars(strip_tags($data->username)) : null;
    $email = !empty($data->email) ? htmlspecialchars(strip_tags($data->email)) : null;

    $query = "UPDATE users SET ";
    $params = [];
    $types = "";

    if ($username !== null) {
        $query .= "username = ?, ";
        $params[] = $username;
        $types .= "s";
    }
    if ($email !== null) {
        $query .= "email = ?, ";
        $params[] = $email;
        $types .= "s";
    }

    $query = rtrim($query, ", ") . " WHERE id = ?";
    $params[] = $id;
    $types .= "i"; // 'id' should be integer

    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$params);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User updated successfully."]);
    } else {
        error_log("Update error: " . $stmt->error); // Log SQL errors
        echo json_encode(["success" => false, "message" => "Failed to update user."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid input."]);
}
?>
