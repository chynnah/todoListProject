<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


session_start();
require_once __DIR__ . "/../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["user_id"], $data["current_password"], $data["new_password"])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$user_id = $data["user_id"];
$current_password = $data["current_password"];
$new_password = password_hash($data["new_password"], PASSWORD_DEFAULT); // Hash the new password

// Verify current password
$sql = "SELECT password FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user || !password_verify($current_password, $user["password"])) {
    echo json_encode(["status" => "error", "message" => "Incorrect current password"]);
    exit;
}

// Update password
$sql = "UPDATE users SET password = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $new_password, $user_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Password updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update password"]);
}
?>
