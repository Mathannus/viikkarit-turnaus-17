<?php
$otteluDao = new OtteluDao();

if(! (empty($kaukalo) || empty($kentta))) {
  $ottelut = $otteluDao->getOttelut($kaukalo, $kentta);
} else {
  $ottelut = $otteluDao->getAllOttelut();
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($ottelut);
