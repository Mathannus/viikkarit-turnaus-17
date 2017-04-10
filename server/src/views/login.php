<?php
use \Firebase\JWT\JWT;

$postData = file_get_contents('php://input',true);
$data = json_decode($postData);
//var_dump($data);

if(!isset($data)) {
  header('HTTP/1.0 403 Forbidden');
  echo 'Missing login payload!';
} else {
  $userDao = new UserDao();
  $userData = $userDao->getUser($data->name);

  if(isset($userData) && $userData['password'] === $data->password) {
    //Hooray we have a match!
    echo JWT::encode($userData['id'], $jwtServerKey);
  } else {
    //VERBOTEN: GO AWAY!!!
    header('HTTP/1.0 403 Forbidden');
    echo 'You are forbidden!';
  }
}
