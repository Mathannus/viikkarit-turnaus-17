<?php
namespace test;
use PHPUnit\Framework\TestCase;

class TeamDaoTest extends TestCase {
  private $teamDao;

  public function setUp() {
    $_SERVER['RDS_HOSTNAME'] = 'localhost';
    $_SERVER['RDS_PORT'] = '3306';
    $_SERVER['RDS_DB_NAME'] = 'viikkarit';
    $_SERVER['RDS_USERNAME'] = 'viikkarit';
    $_SERVER['RDS_PASSWORD'] = 'arvilind';


    $this->teamDao = new \TeamDao();
  }

  public function testGetAllTeams() {

    $teams = $this->teamDao->getAllTeams();
    $this->assertNotNull($teams);
    $this->assertTrue(is_array($teams));

    foreach($teams as $team) {
      $this->assertInstanceOf(\Team::class, $team);
      $this->assertTrue(isset($team->id));
      $this->assertTrue(isset($team->nimi));
      $this->assertTrue(isset($team->logo));
      $this->assertTrue(isset($team->lohko));
      $this->assertTrue(isset($team->seura));
      $this->assertTrue(isset($team->tunniste));
    }
  }


  public function testCalculatePisteet() {

    $team = new \Team();
    $team->tunniste = 'team1';

    //Home win
    $ottelut = [
      $this->generateGame('team1','team2',1,0)
    ];
    $pisteet = $this->teamDao->calculatePisteet($team, $ottelut);
    $this->assertEquals(2, $pisteet);

    //Guest and Home win
    $ottelut = [
      $this->generateGame('team1','team2',1,0),
      $this->generateGame('team3','team1',0,1)
    ];
    $pisteet = $this->teamDao->calculatePisteet($team, $ottelut);
    $this->assertEquals(4, $pisteet);

    //Add a draw
    $ottelut[] = $this->generateGame('team3','team1',5,5);
    $pisteet = $this->teamDao->calculatePisteet($team, $ottelut);
    $this->assertEquals(5, $pisteet);

    //Add a loss
    $ottelut[] = $this->generateGame('team3','team1',5,4);
    $pisteet = $this->teamDao->calculatePisteet($team, $ottelut);
    $this->assertEquals(5, $pisteet);
  }

  public function testCalculateRankings() {
    $ottelut = [
      $this->generateGame('team1','team2',1,0),
      $this->generateGame('team3','team1',0,1),
      $this->generateGame('team2','team3',2,3)
    ];

    $teams = [
      $this->generateTeam('team1',4),
      $this->generateTeam('team2',0),
      $this->generateTeam('team3',2)
    ];

    $teams = $this->teamDao->calculateRankings($teams, $ottelut);
    $this->assertNotNull($teams);
    $this->assertTrue(is_array($teams));
    $this->assertEquals(3,count($teams));
    $this->assertEquals(1, $teams[0]->ranking);
    $this->assertEquals('team1', $teams[0]->tunniste);

    $this->assertEquals(3, $teams[1]->ranking);
    $this->assertEquals('team2', $teams[1]->tunniste);
    $this->assertEquals(2, $teams[2]->ranking);
    $this->assertEquals('team3', $teams[2]->tunniste);

  }

  public function testCalculateTehdytMaalit() {
    $ottelut = [
      $this->generateGame('team1','team2',3,0),
      $this->generateGame('team3','team1',0,4),
      $this->generateGame('team2','team3',1,1)
    ];
    $team = $this->generateTeam('team1');
    $tm = $this->teamDao->calculateTehdytMaalit($team, $ottelut);

    $this->assertEquals(7, $tm);

  }

  public function testCalculatePaastetytMaalit() {
    $ottelut = [
      $this->generateGame('team1','team2',3,1),
      $this->generateGame('team3','team1',2,4),
      $this->generateGame('team2','team3',1,1)
    ];
    $team = $this->generateTeam('team1');
    $pm = $this->teamDao->calculatePaastetytMaalit($team, $ottelut);

    $this->assertEquals(3, $pm);
  }

  public function testCalculateTeamStatistics() {
    $ottelut = [
      $this->generateGame('team1','team2',1,0),
      $this->generateGame('team3','team1',0,1),
      $this->generateGame('team2','team3',1,1)
    ];

    $teams = [
      $this->generateTeam('team1'),
      $this->generateTeam('team2'),
      $this->generateTeam('team3')
    ];

    $teams = $this->teamDao->calculateTeamStatistics($teams, $ottelut);

    $this->assertNotNull($teams);
    $this->assertTrue(is_array($teams));
    $this->assertEquals(3,count($teams));

    $this->assertEquals(4, $teams[0]->pisteet);
    $this->assertEquals(1, $teams[0]->ranking);
    $this->assertEquals(1, $teams[1]->pisteet);
    $this->assertEquals(2, $teams[1]->ranking);
    $this->assertEquals(1, $teams[2]->pisteet);
    $this->assertEquals(2, $teams[2]->ranking);
  }


  private function generateGame($home, $guest, $scoreHome, $scoreGuest) {
    return new \Ottelu([
      'koti' => $home,
      'vieras_joukkue' => $guest,
      'maalit_koti_joukkue' => $scoreHome,
      'maalit_vieras_joukkue' => $scoreGuest,
      'id' => 1,
      'aika' => '9:00',
      'jaakunnostus' => 0,
      'palkintojen_jako' => 0,
      'lohko' => 'a'
    ]);
  }

  private function generateTeam($tunniste,$pisteet = 0) {
    $team = new \Team();
    $team->tunniste = $tunniste;
    $team->pisteet = $pisteet;

    return $team;

  }

}
