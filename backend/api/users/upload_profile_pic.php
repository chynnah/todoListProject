<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json"); // Ensure JSON response

error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require_once __DIR__ . "/../../config/db.php";

$response = ["success" => false, "message" => ""];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!empty($_FILES["profile_pic"]) && !empty($_POST["id"])) {
        $userId = intval($_POST["id"]);
        $targetDir = "/var/www/uploads/"; // Outside of the main project

        // Ensure the uploads directory exists
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $fileName = basename($_FILES["profile_pic"]["name"]);
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowedTypes = ["jpg", "jpeg", "png", "gif"];

        if (in_array($fileExt, $allowedTypes)) {
            $newFileName = "user_" . $userId . "_" . time() . "." . $fileExt;
            $targetFilePath = $targetDir . $newFileName;

            if (move_uploaded_file($_FILES["profile_pic"]["tmp_name"], $targetFilePath)) {
                $query = "UPDATE users SET profile_pic = ? WHERE id = ?";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("si", $targetFilePath, $userId);

                if ($stmt->execute()) {
                    $response = ["success" => true, "message" => "Profile picture updated!", "profile_pic" => $targetFilePath];
                } else {
                    $response["message"] = "Database update failed.";
                }
            } else {
                $response["message"] = "File upload failed.";
            }
        } else {
            $response["message"] = "Invalid file type.";
        }
    } else {
        $response["message"] = "No file or user ID provided.";
    }
}

echo json_encode($response);
?>
