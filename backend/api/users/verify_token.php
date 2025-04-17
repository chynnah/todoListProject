<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/../../config/db.php";

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->token)) {
    $token = $conn->real_escape_string($data->token);
    
    $stmt = $conn->prepare("SELECT id FROM password_resets WHERE token = ? AND expires_at > NOW()");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $stmt->store_result();
    
    echo json_encode(["valid" => $stmt->num_rows > 0]);
    exit;
}

echo json_encode(["valid" => false]);
?>