<?php


class Ottelu {

  public $id;
  public $aika;
  public $koti;
  public $vieras;
  public $jaakunnostus;
  public $palkintojen_jako;
  public $lohko;
  public $tulos = array();


  //Populate object from data in db
  function __construct($dbArray) {
    $this->id = $dbArray['id'];
    $this->aika = $dbArray['aika'];
    $this->koti = $dbArray['koti'];
    $this->vieras = $dbArray['vieras_joukkue'];
    $this->jaakunnostus = intval($dbArray['jaakunnostus']) === 1;
    $this->palkintojen_jako = intval($dbArray['palkintojen_jako']) === 1;
    $this->lohko = $dbArray['lohko'];
    $tulosKoti = $dbArray['maalit_koti_joukkue'];
    $tulosVieras = $dbArray['maalit_vieras_joukkue'];



//    var_dump($tulosKoti);
    //We have a score if
    if(is_numeric($tulosKoti)) {
      $this->tulos[0] = intval($tulosKoti);
      $this->tulos[1] = intval($tulosVieras);
    }
  }

}
