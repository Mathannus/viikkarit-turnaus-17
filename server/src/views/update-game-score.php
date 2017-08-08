<?php

//The user must be authenticated in order to do this operation
if(AuthHandler::isAuthenticated()) {
$data = json_decode(file_get_contents('php://input'));

$otteluDao = new OtteluDao();
$result = $otteluDao->updateOtteluTulos($id, $data->tulosKoti, $data->tulosVieras);
echo '{"result":"'.$result.'", "id": "'.$id.'"}';
}
