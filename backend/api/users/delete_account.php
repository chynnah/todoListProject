<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

session_start();
require_once __DIR__ . "/../../config/db.php";

if (!$conn) {
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit;
}

if (!isset($_SESSION["user_id"])) {
    echo json_encode(["success" => false, "message" => "Unauthorized. Please log in first."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

if (empty($data->password)) {
    echo json_encode(["success" => false, "message" => "Password is required."]);
    exit;
}

$user_id = $_SESSION["user_id"];
$password = htmlspecialchars(strip_tags($data->password));

$stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "User not found."]);
    exit;
}

$stmt->bind_result($db_password);
$stmt->fetch();

if (!password_verify($password, $db_password)) {
    echo json_encode(["success" => false, "message" => "Incorrect password."]);
    exit;
}

// Delete the user account
$deleteStmt = $conn->prepare("DELETE FROM users WHERE id = ?");
$deleteStmt->bind_param("i", $user_id);
if ($deleteStmt->execute()) {
    session_unset();
    session_destroy();

    echo json_encode(["success" => true, "message" => "Account deleted successfully."]);
    exit;
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete account."]);
    exit;
}
