<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
require __DIR__ . "/../../config/db.php";
require __DIR__ . "/../../config/cloudinary_config.php";

$response = ["success" => false, "message" => ""];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!empty($_FILES["profile_pic"]) && !empty($_POST["id"])) {
        $userId = intval($_POST["id"]);

        $fileTmpPath = $_FILES["profile_pic"]["tmp_name"];
        $fileType = mime_content_type($fileTmpPath); 
        $fileData = file_get_contents($fileTmpPath);
        $base64File = "data:" . $fileType . ";base64," . base64_encode($fileData);

        // Cloudinary API 
        $cloudinary_url = "https://api.cloudinary.com/v1_1/" . CLOUDINARY_CLOUD_NAME . "/image/upload";
        $cloudinary_preset = CLOUDINARY_UPLOAD_PRESET; 

        $data = [
            "file" => $base64File,
            "upload_preset" => $cloudinary_preset
        ];

        // Initialize cURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $cloudinary_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

        // Execute request
        $response_json = curl_exec($ch);

        // Check for cURL errors
        if (curl_errno($ch)) {
            error_log("cURL error: " . curl_error($ch));
            echo json_encode(["success" => false, "message" => "Cloudinary cURL error: " . curl_error($ch)]);
            exit;
        }

        curl_close($ch);

        // Decode Cloudinary response
        $response_data = json_decode($response_json, true);

        // Log Cloudinary response for debugging
        error_log("Cloudinary response: " . print_r($response_data, true));

        if (isset($response_data["secure_url"])) {
            $profilePicUrl = $response_data["secure_url"];

            // Update database
            $query = "UPDATE users SET profile_pic = ? WHERE id = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("si", $profilePicUrl, $userId);

            if ($stmt->execute()) {
                $response = ["success" => true, "message" => "Profile picture updated!", "profile_pic" => $profilePicUrl];
            } else {
                $response["message"] = "Database update failed.";
            }
        } else {
            $response["message"] = "Cloudinary upload failed.";
        }
    } else {
        $response["message"] = "No file or user ID provided.";
    }
}

echo json_encode($response);
?>
