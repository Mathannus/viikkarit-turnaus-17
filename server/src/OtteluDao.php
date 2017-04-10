<?php

class OtteluDao {

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

  function getAllOttelut() {
    $ottelut = new stdClass();
    $data = $this->dbh->query('SELECT * from ottelut order by  kaukalo, kentta, aika')->fetchAll();

    //var_dump($data);
    $previousKentta = '';
    $previousKaukalo = '';
    foreach($data as $ottelu) {
        $kaukalo = $ottelu['kaukalo'];
        if($kaukalo != $previousKaukalo) {
          $ottelut->{$kaukalo} = new stdClass();
          $previousKaukalo = $kaukalo;
        }

        $kentta = $ottelu['kentta'];
        if($kentta != $previousKentta) {
          $ottelut->{$kaukalo}->{$kentta} = new stdClass();
          $previousKentta = $kentta;
          $ottelut->{$kaukalo}->{$kentta}->lohko = $ottelu['lohko'];
          $ottelut->{$kaukalo}->{$kentta}->ottelut = array();

        }

        $ottelut->{$kaukalo}->{$kentta}->ottelut[] = new Ottelu($ottelu);
    }

    return $ottelut;
  }


  function getOttelut($kaukalo, $kentta) {

    $ottelut = array();
    $stmt = $this->dbh->prepare('SELECT * FROM ottelut WHERE kaukalo=:kaukalo AND kentta=:kentta ORDER BY aika');
    $stmt->bindParam(':kaukalo', $kaukalo);
    $stmt->bindParam(':kentta', $kentta);
    $stmt->execute();

    while ($row = $stmt->fetch()) {
      $ottelut[] = new Ottelu($row);
    }

    $stmt = null;
    return $ottelut;
  }

  function getPelatutOttelutByLohko($lohko) {
    $ottelut = array();
    $stmt = $this->dbh->prepare('SELECT * FROM ottelut WHERE maalit_koti_joukkue >=0 and lohko=:lohko ORDER BY aika');

    if(strpos($lohko,'lohko-') === false) {
      $_lohko = 'lohko-'.$lohko;
    } else {
        $_lohko = $lohko;
    }
    $stmt->bindParam(':lohko', $_lohko);
    $stmt->execute();

    while ($row = $stmt->fetch()) {
      $ottelut[] = new Ottelu($row);
    }

    $stmt = null;
    return $ottelut;
  }

  function getPelatutOttelutByJoukkue($joukkue) {
    $ottelut = array();
    $stmt = $this->dbh->prepare('SELECT * FROM ottelut WHERE maalit_koti_joukkue >=0 AND (koti=:joukkue OR vieras_joukkue=:joukkue) ORDER BY aika');
    $stmt->bindParam(':joukkue', $joukkue);
    $stmt->execute();

    while ($row = $stmt->fetch()) {
      $ottelut[] = new Ottelu($row);
    }

    $stmt = null;
    return $ottelut;

  }

  function updateOtteluTulos($id, $tulosKoti, $tulosVieras) {
    $stmt = $this->dbh->prepare("UPDATE ottelut SET maalit_koti_joukkue=:tulosKoti, maalit_vieras_joukkue=:tulosVieras where ID=:id");

    //If empty strings passed then set the values to NULL
    $tulosKoti = is_numeric($tulosKoti) ? $tulosKoti : NULL;
    $tulosVieras = is_numeric($tulosVieras) ? $tulosVieras : NULL;

    //If either param is null and the other is not then we must return an error.
    if($tulosKoti == NULL && $tulosVieras != NULL) {
      return "tulosVieras must be empty if tulosKoti is";
    }
    if($tulosVieras == NULL && $tulosKoti != NULL) {
      var_dump($tulosVieras);
      return "tulosKoti must be empty if tulosVieras is";
    }

    $stmt->bindParam(':tulosKoti',$tulosKoti,PDO::PARAM_INT);
    $stmt->bindParam(':tulosVieras',$tulosVieras, PDO::PARAM_INT);
    $stmt->bindParam(':id',$id);
    $stmt->execute();
    $stmt = null;

    return "Ok";
  }
}
