import {joukkueApi} from './JoukkueApi';

const testGameData = [
  {"id":"1","aika":"09:00:00","koti":"Viik H","vieras":"Vir M","lohko":"lohko-a","tulos":[1,2]},
  {"id":"5","aika":"10:45:00","koti":"Jok S","vieras":"Viik H","lohko":"lohko-a","tulos":[1,2]},
  {"id":"9","aika":"12:30:00","koti":"Viik H","vieras":"KJT W","lohko":"lohko-a","tulos":[5,5]}
];

it('getJoukkueet should return all teams', () => {
  const joukkueet = joukkueApi.getJoukkueet();

  expect(joukkueet.length).toBe(24);
  expect(joukkueet[23]).toEqual({ tunniste: "Ket S",
        nimi: "Imatran Ketterä Sininen",
        logo: "kettera2-logo.png",
        ranking: "",
        pisteet: "",
        lohko: "D"});

});

it("getJoukkeet by lohko should return teams of one group", () => {
  const joukkueet = joukkueApi.getJoukkueet("A");
  expect(joukkueet).not.toBeNull();
  expect(joukkueet.length).toBe(6);
  joukkueet.map((joukkue) => {
    expect(joukkue.lohko).toBe("A");
  });
});

it("getJoukkue should return exactly one team", () => {
  const joukkue = joukkueApi.getJoukkue("Viik H");
  expect(joukkue).toEqual({
    tunniste: "Viik H",
    nimi: "Viikingit Hettari",
    logo: "viikkarit-logo.jpg",
    ranking: "",
    pisteet: "",
    lohko: "A"});
});
it("getJoukkue should return empty object when no team is found", () => {
  const joukkue = joukkueApi.getJoukkue("Not found");
  expect(joukkue).toBeDefined();
});

it("calculateJoukkuePisteet when Viik H should be 3", () =>{
  const points = joukkueApi.calculateJoukkuePisteet("Viik H", testGameData);

  expect(points).toBe(3);
});

it("calculateJoukkuePisteet when Vir M should be 2", () =>{
  const points = joukkueApi.calculateJoukkuePisteet("Vir M", testGameData);

  expect(points).toBe(2);
});

it("calculateJoukkeRankings when Viik H should be 1", () =>{
  const rankings = joukkueApi.calculateJoukkeRankings("Viik H", testGameData);

  expect(rankings).toBe(1);
});
