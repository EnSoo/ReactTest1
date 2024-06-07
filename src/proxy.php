<?php
header("Content-Type: application/json");

$apiKey = "6e8afcb0c7db9a80a6f595d62c8056eb";
$apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=" . $apiKey;

$response = file_get_contents($apiUrl);

if ($response === false) {
    echo json_encode(array("error" => "API request failed"));
} else {
    echo $response;
}
?>