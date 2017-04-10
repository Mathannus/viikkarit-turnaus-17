<?php

class UserDao {

  private $dbh;

  function __construct() {
    $dbhost = $_SERVER['RDS_HOSTNAME'];
    $dbport = $_SERVER['RDS_PORT'];
    $dbname = $_SERVER['RDS_DB_NAME'];
    $charset = 'utf8' ;

    $dsn = "mysql:host={$dbhost};port={$dbport};dbname={$dbname};charset={$charset}";
    $username = $_SERVER['RDS_USERNAME'];
    $password = $_SERVER['RDS_PASSWORD'];

    $this->dbh = new PDO($dsn, $username, $password);

//    $this->dbh = new PDO('mysql:host=localhost;dbname=viikkarit;charset=utf8mb4', 'viikkarit', 'arvilind');
  }


  function getUser($login) {
    $stmt = $this->dbh->prepare('SELECT id, login, password FROM user WHERE login=:login');

    $stmt->bindParam(':login', $login);
    $stmt->execute();
    $row = $stmt->fetch();

    $stmt = null;
    return $row;


  }


}
