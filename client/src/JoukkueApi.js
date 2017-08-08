
export class JoukkueApi {


  constructor(joukkueet = []) {
    console.log("JoukkueApi.constructor",joukkueet);
    this.joukkueet = [...joukkueet];
//    this.getJoukkueetFromServer();
    //this.joukkueet = Joukkueet.joukkueet;
  }

  getJoukkueetFromServer(params = []) {
    const serverUrl = process.env.REACT_APP_API_SERVER_HOST,
          url = serverUrl +"/"+ ["joukkueet", ...params].join('/');

          fetch(url).then((response) => response.json())
          .then((items) => console.log(items))
          .then((items) => this.joukkueet = items);
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
//    console.log("getJoukkue",tunniste, this.joukkeet);
    return this.joukkueet.find((joukkue) =>{
      return joukkue.tunniste === tunniste;
    });
  }

  calculateJoukkuePisteet(joukkueTunnus, ottelut=[]) {
    if(ottelut.length === 0) return null;

//    console.log("calculateJoukkuePisteet",joukkueTunnus, ottelut);

    const points = ottelut.reduce((acc, ottelu) => {
      acc += (ottelu.koti === joukkueTunnus && ottelu.tulos[0] > ottelu.tulos[1]) ? 2 :
            (ottelu.vieras === joukkueTunnus && ottelu.tulos[0] < ottelu.tulos[1]) ? 2 :
            (ottelu.koti === joukkueTunnus && ottelu.tulos[0] === ottelu.tulos[1]) ? 1 :
            (ottelu.vieras === joukkueTunnus && ottelu.tulos[0] === ottelu.tulos[1]) ? 1 :
            0;
      return acc;
    },0);

    console.log(points);
    return points;
  }

 calculateJoukkueRankings(joukkueTunnus, ottelut=[]) {

     const rankings = ottelut.reduce((acc,curr) => {

       //Skip ice cleaning or price ceremony
       if(curr.jaakunnostus || curr.palkintojen_jako) return acc;

       if(!acc.find((joukkue) => (joukkue.tunniste === curr.koti))) {
          let joukkue = this.getJoukkue(curr.koti);
//          console.log("curr.koti:",curr, "joukkue:",joukkue);

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

//export let joukkueApi = new JoukkueApi();
