<?php

class TeamDao {

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
    $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  function getAllTeams() {
    $teams = $this->dbh->query('SELECT id, tunniste, nimi, logo, lohko, seura from joukkue order by nimi, seura')->fetchAll(PDO::FETCH_CLASS, 'Team');
    return $teams;
  }

  function getTeamsByLohko($lohko) {
    $sql = 'SELECT j.id, j.tunniste, j.nimi, j.logo, j.lohko, j.seura
            FROM joukkue j
            WHERE j.lohko = :lohko
            ORDER BY j.nimi, j.seura';

    $stmt = $this->dbh->prepare($sql);
    if(strpos($lohko,'lohko-') !== false) {
      $_lohko = substr($lohko, strlen('lohko-'));
    } else {
        $_lohko = $lohko;
    }
    $stmt->bindParam(':lohko', $_lohko);
    $stmt->execute();

    $teams = $stmt->fetchAll(PDO::FETCH_CLASS, 'Team');
    return $teams;
  }

  function getTeam($teamId) {

    $sql = 'select j.id, j.tunniste, j.nimi, j.logo, j.lohko, j.seura, count(o1.id) * 2 + count(o2.id) * 2 + count(o3.id) as pisteet
            from joukkue j
            left join ottelut o1 on (j.tunniste = o1.koti and o1.maalit_koti_joukkue > o1.maalit_vieras_joukkue)
            left join ottelut o2 on (j.tunniste = o2.vieras_joukkue and o2.maalit_koti_joukkue < o2.maalit_vieras_joukkue)
            left join ottelut o3 on (j.tunniste = o3.koti and o3.maalit_koti_joukkue = o3.maalit_vieras_joukkue)
            where j.tunniste = :teamId
            group by o1.id, o2.id, o3.id';

    $stmt = $this->dbh->prepare($sql);
    $stmt->bindParam(':teamId', $teamId);

    $stmt->setFetchMode(PDO::FETCH_CLASS, 'Team');
    $stmt->execute();

    $team = $stmt->fetch();
//    if($team)
    return $team;

  }

  function calculatePisteet($team, $ottelut) {
    $pisteet = 0;

    foreach($ottelut as $ottelu) {
  //    var_dump($team);
      if($ottelu->koti === $team->tunniste && $ottelu->tulos[0] > $ottelu->tulos[1]) {
        //home team win
        $pisteet += 2;
      } else if($ottelu->vieras === $team->tunniste && $ottelu->tulos[0] < $ottelu->tulos[1]) {
        //guest team win
        $pisteet += 2;
      } else if(($ottelu->vieras === $team->tunniste || $ottelu->koti === $team->tunniste)
              && $ottelu->tulos[0] === $ottelu->tulos[1]) {
        //draw
        $pisteet += 1;
      }
    }

    return $pisteet;
  }

  function calculateTehdytMaalit($team, $ottelut) {
    $tm = 0;
    foreach($ottelut as $ottelu) {
      if($ottelu->koti === $team->tunniste) {
        $tm += $ottelu->tulos[0];
      } else if($ottelu->vieras === $team->tunniste) {
        $tm += $ottelu->tulos[1];
      }
    }

    return $tm;
  }

  function calculatePaastetytMaalit($team, $ottelut) {
    $pm = 0;
    foreach($ottelut as $ottelu) {
      if($ottelu->vieras === $team->tunniste) {
        $pm += $ottelu->tulos[0];
      } else if($ottelu->koti === $team->tunniste) {
        $pm += $ottelu->tulos[1];
      }
    }
    return $pm;
  }

  private static function compareTeams($teamA, $teamB) {
    return $teamB->pisteet - $teamA->pisteet;
  }

  function calculateRankings($teams, $ottelut) {
    $rankedTeams = array_merge(array(), $teams);
    usort($rankedTeams,array('TeamDao','compareTeams'));

    $previousRankedTeam = null;
    for($i=0;$i<count($rankedTeams); $i++) {

      if($previousRankedTeam != null && TeamDao::compareTeams($previousRankedTeam, $rankedTeams[$i]) === 0) {
        $rankedTeams[$i]->ranking = $previousRankedTeam->ranking;
      } else {
        $rankedTeams[$i]->ranking = $i+1;
      }
      $previousRankedTeam = $rankedTeams[$i];
    }
    return $teams;
  }

  function calculateTeamStatistics($teams, $ottelut) {

    if(is_array($teams)) {
      foreach($teams as $team) {
        $team->pisteet = $this->calculatePisteet($team, $ottelut);
        $team->tehdytMaalit = $this->calculateTehdytMaalit($team, $ottelut);
        $team->paastetytMaalit = $this->calculatePaastetytMaalit($team, $ottelut);
      }
      $this->calculateRankings($teams, $ottelut);
    } else {

    }

    return $teams;
  }
}
