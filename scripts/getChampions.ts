import { prisma } from "../src/server/utils/prisma";

export async function fetchChampions(){

  let championArray = [];
  const parsedJSON: any = await fetch('http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json').then(data => data.json());
  for (const key in parsedJSON.data) {
    championArray.push(parsedJSON.data[key]);
  }
    const CHAMPIONS_TO_DATABASE = championArray.map((champion) => {
      const { name, image } = champion;
      return {
        name,
        image: `http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${image.full}`,
      }
    });

    const deleteChampions = await prisma.champion.deleteMany({});

    const creation = await prisma.champion.createMany({
      data: CHAMPIONS_TO_DATABASE
    });

    console.log("Deleted Champions?", deleteChampions)
    console.log("Created?", creation);

};

fetchChampions();