import Joukkueet from './joukkueet.json';

export class JoukkueApi {

  static joukkueet;

  constructor() {

    this.joukkueet = Joukkueet.joukkueet;
  }

  getJoukkueet(lohko="") {
    if(lohko === "") {
      return this.joukkueet;
    } else {
      return this.joukkueet.filter((joukkue) => {
        return joukkue.lohko === lohko;
      });
    }
  }

  getJoukkue(tunniste) {
    return this.joukkueet.find((joukkue) =>{
      return joukkue.tunniste === tunniste;
    });
  }

  calculateJoukkuePisteet(joukkueTunnus, ottelut=[]) {
    if(ottelut.length === 0) return null;

    const points = ottelut.reduce((acc, ottelu) => {
      acc += (ottelu.koti === joukkueTunnus && ottelu.tulos[0] > ottelu.tulos[1]) ? 2 :
            (ottelu.vieras === joukkueTunnus && ottelu.tulos[0] < ottelu.tulos[1]) ? 2 :
            (ottelu.koti === joukkueTunnus && ottelu.tulos[0] === ottelu.tulos[1]) ? 1 :
            (ottelu.vieras === joukkueTunnus && ottelu.tulos[0] === ottelu.tulos[1]) ? 1 :
            0;
      return acc;
    },0);

    return points;
  }

 calculateJoukkueRankings(joukkueTunnus, ottelut=[]) {

     const rankings = ottelut.reduce((acc,curr) => {

       if(!acc.find((joukkue) => (joukkue.tunniste === curr.koti))) {
          let joukkue = this.getJoukkue(curr.koti);
          joukkue.pisteet = this.calculateJoukkuePisteet(joukkue.tunniste, ottelut);
          acc.push(joukkue);
       }

       if(!acc.find((joukkue) => (joukkue.tunniste === curr.vieras))) {
         let joukkue = this.getJoukkue(curr.vieras);
          joukkue.pisteet = this.calculateJoukkuePisteet(joukkue.tunniste, ottelut);
          acc.push(joukkue);
      }
      return acc;

     },[]);

   const joukkueRanking =  rankings.sort((a,b) => (b.pisteet - a.pisteet)).findIndex((joukkue) => (joukkue.tunniste === joukkueTunnus));
   // rankings starts from 1 but index starts from zero.
   return joukkueRanking >= 0 ? joukkueRanking + 1 : rankings.length + 1;
//   return joukkueRanking + 1;
 }
}

export let joukkueApi = new JoukkueApi();
