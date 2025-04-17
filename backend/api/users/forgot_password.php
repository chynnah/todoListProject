<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/../../config/db.php";

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email)) {
    $email = $conn->real_escape_string($data->email);

    // Check if email exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($user_id);
        $stmt->fetch();

        // Generate token
        $token = bin2hex(random_bytes(32));
        $expires = date("Y-m-d H:i:s", time() + 3600); // 1 hour expiration

        // Store token in database
        $stmt = $conn->prepare("INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)");
        $stmt->bind_param("iss", $user_id, $token, $expires);
        $stmt->execute();

        // For development, return the reset link
        $reset_link = "http://localhost:5173/reset-password?token=$token";
        
        echo json_encode([
            "success" => true,
            "message" => "Password reset link has been sent to your email.",
            "dev_link" => $reset_link
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "No account found with that email address."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Please provide an email address."
    ]);
}

$conn->close();
?>