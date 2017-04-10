<?php
require_once __DIR__.'/../vendor/autoload.php';
// TODO - Implement Rest service for providing the game scores to the client.
// The service should also allow updating of game results
//
//

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
header('Content-Type: application/json');

//$jwtServerKey = 'secret_server_key';
$jwtServerKey = $_SERVER['JWT_SECRET'];
$router = new AltoRouter();
//$router->setBasePath('/tulospalvelu');
$router->map('GET', '/' , function() {
    require __DIR__ . '/views/home.php';
});

$router->map('GET', '/ottelut' , function() {
    require __DIR__ . '/views/games.php';
});
$router->map('GET', '/ottelut/[a:kaukalo]/[a:kentta]' , function($kaukalo, $kentta) {
    require __DIR__ . '/views/games.php';
});
$router->map('GET', '/ottelut/pelatut/lohko/[*:lohko]' , function($lohko) {
    require __DIR__ . '/views/played-games.php';
});
$router->map('GET', '/ottelut/pelatut/joukkue/[*:joukkue]' , function($joukkue) {
    require __DIR__ . '/views/played-games.php';
});

$router->map('POST', '/ottelu/[i:id]' , function($id) {
    global $jwtServerKey;
    require __DIR__ . '/views/update-game-score.php';
});
$router->map('POST', '/login' , function() {
    global $jwtServerKey;
    require __DIR__ . '/views/login.php';
});

$match = $router->match();

// call closure or throw 404 status
if( $match && is_callable( $match['target'] ) ) {
  call_user_func_array( $match['target'], $match['params'] );
} else {
    echo 'No match' . PHP_EOL;
    var_dump($match);
    // no route was matched
    //header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}
