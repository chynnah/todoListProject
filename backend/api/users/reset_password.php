<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/../../config/db.php";

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->token) && !empty($data->password)) {
    $token = $conn->real_escape_string($data->token);
    $password = password_hash($data->password, PASSWORD_DEFAULT);

    // Check if token is valid and not expired
    $stmt = $conn->prepare("SELECT user_id FROM password_resets WHERE token = ? AND expires_at > NOW()");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($user_id);
        $stmt->fetch();

        // Update user's password
        $update_stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
        $update_stmt->bind_param("si", $password, $user_id);
        $update_stmt->execute();

        // Delete the used token
        $delete_stmt = $conn->prepare("DELETE FROM password_resets WHERE token = ?");
        $delete_stmt->bind_param("s", $token);
        $delete_stmt->execute();

        echo json_encode([
            "success" => true,
            "message" => "Password has been reset successfully."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Invalid or expired token."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Token and new password are required."
    ]);
}

$conn->close();
?>