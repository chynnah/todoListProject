<?php

$envFile = __DIR__ . "/../../.env"; 
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue; 
        putenv($line); 
    }
}

define('CLOUDINARY_CLOUD_NAME', getenv('CLOUDINARY_CLOUD_NAME'));
define('CLOUDINARY_UPLOAD_PRESET', getenv('CLOUDINARY_UPLOAD_PRESET'));
