<?php

//$db = new PDO('mysql:host=localhost;dbname=viikkarit;charset=utf8mb4', 'viikkarit', 'arvilind');

$otteluDao = new OtteluDao();

if(!empty($lohko)) {
  $ottelut = $otteluDao->getPelatutOttelutByLohko($lohko);
} else if(!empty($joukkue)) {
  $joukkueDecoded = urldecode($joukkue);
  $ottelut = $otteluDao->getPelatutOttelutByJoukkue($joukkueDecoded);
} else {
  $ottelut = array();
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($ottelut);
/*
$string = file_get_contents(__DIR__."/../otteluohjelma.json");
//$json_a = json_decode($string, true);
$json_a = json_decode($string);

echo ($string);

//var_dump($json_a);
*/
