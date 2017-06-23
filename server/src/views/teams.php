<?php
$teamDao = new TeamDao();
$otteluDao = new OtteluDao();


if(isset($teamId)) {
    $teams = $teamDao->getTeam(urldecode($teamId));
    $ottelut = $otteluDao->getPelatutOttelutByLohko($teams->lohko);
} else if(isset($lohko)) {
    $teams = $teamDao->getTeamsByLohko($lohko);
    $ottelut = $otteluDao->getPelatutOttelutByLohko($lohko);
} else {
  $teams = $teamDao->getAllTeams();
  $ottelut = $otteluDao->getPelatutOttelut();
}

$teams = $teamDao->calculateTeamStatistics($teams, $ottelut);
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($teams);
