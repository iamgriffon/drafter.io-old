import Image from "next/image";
import { useEffect } from "react";
import { useMenu } from "@/context/MenuContext";
import { Champion } from "@/types/draft";

interface ChampionListProps {
  champions: Champion[]
  selectedChampion: Champion,
  handleClickChampion: (param: Champion) => void;
}

export function ChampionList({champions, handleClickChampion, selectedChampion }: ChampionListProps) {
  const {
    searchChampion,
  } = useMenu();

  useEffect(() => {
  handleClickChampion(selectedChampion)
  },[handleClickChampion, selectedChampion])

  const filteredChampions = [...champions].length
    ? champions.filter((champion) =>
        champion.name.toLowerCase().includes(searchChampion.toLowerCase())
      )
    : [];

    if (!champions) return <>Loading</>

  return (
    <div
      className="overflow-x-hidden h-[40rem] w-screen max-w-5xl border-4 rounded-md border-gray-400 cursor-pointer 
      scroll scrollbar scrollbar-track-transparent scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md"
    >
      <div className="grid grid-cols-10 m-3 p-3 gap-3 items-center">
        {filteredChampions.map((champion, index) => (
          <div key={index} className={`${champion.name === selectedChampion.name ? 'border-2 border-white' : ''}`}>
            {champion.draftable === true && (
              <Image
              onClick={() => handleClickChampion(champion)}
                width={75}
                height={75}
                src={champion.image}
                alt={champion.name}
              
              />
            )}{" "}
            {champion.draftable === false && (
              <Image
                width={75}
                height={75}
                src={champion.image}
                alt={champion.name}
                className="grayscale"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
