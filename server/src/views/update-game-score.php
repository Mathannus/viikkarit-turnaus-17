<?php
use \Firebase\JWT\JWT;

//The user must be authenticated in order to do this operation
$requestHeaders = getallheaders();

if(!isset($requestHeaders['Authorization']) || empty($requestHeaders['Authorization'])) {
  header('HTTP/1.0 403 Forbidden');
  echo 'Missing or empty Authorization header!';
  return;
}

$authToken = $requestHeaders['Authorization'];
$authToken = substr($authToken, strlen('Bearer '));

$token = JWT::decode($authToken, $jwtServerKey, ['HS256']);

//var_dump($token);
//GET the JSON payload from the PUT request

$data = json_decode(file_get_contents('php://input'));

$otteluDao = new OtteluDao();
$result = $otteluDao->updateOtteluTulos($id, $data->tulosKoti, $data->tulosVieras);
echo '{"result":"'.$result.'", "id": "'.$id.'"}';
