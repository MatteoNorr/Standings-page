import { randNumGen } from "./fn.js";

let url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${randNumGen()}`;

//GET
export const GET = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

//videogames generator (API Free-to-play-games-database)
export const videogamesGen = async () => {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4d8acdc372mshb086e1fc1daeca4p16a3dfjsna7712041e65c",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  });
  const data = await res.json();

  return data;
};
