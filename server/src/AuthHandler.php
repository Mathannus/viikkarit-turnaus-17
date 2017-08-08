<?php
use \Firebase\JWT\JWT;

class AuthHandler {

  /*
   * Will try to find a header with the following combinations:
   * headerKey (original)
   * HEADERKEY (All caps)
   * headerkey (All lower caps)
   * HeaderKey (Capitalize first letter)
   * If no match or provided key is empty then NULL is returned
   */
  static function getHeaderCaseInsensitive($headerKey) {

    if(empty($headerKey)) return NULL;

    $headerVal = NULL;
    $requestHeaders = getallheaders();

    if(isset($requestHeaders[$headerKey])) {
      $headerVal = $requestHeaders[$headerKey];
    } else if(isset($requestHeaders[strtoupper($headerKey)])) {
      $headerVal = $requestHeaders[strtoupper($headerKey)];
    } else if(isset($requestHeaders[strtolower($headerKey)])) {
      $headerVal = $requestHeaders[strtolower($headerKey)];
    }

    return $headerVal;

  }

  static function isAuthenticated() {
    $authToken = self::getHeaderCaseInsensitive('Authorization');
    if(empty($authToken)) {
      header('HTTP/1.0 403 Forbidden');
      echo 'Missing or empty Authorization header!';
      return false;
    }

    $authToken = substr($authToken, strlen('Bearer '));

    $jwtServerKey = getenv('JWT_SECRET');

    $token = JWT::decode($authToken, $jwtServerKey, ['HS256']);

    //TODO: Should the token be checked for validity?

    return true;
  }
}
