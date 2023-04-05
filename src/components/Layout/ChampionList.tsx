import Image from "next/image";
import { useDraft } from "@/context/DraftContext";
import { useCallback } from "react";

export function ChampionList() {
  const {
    pickOrBanChampion,
    champions,
    searchChampion,
    selectSlot,
    draftChampion,
    updateChampions
  } = useDraft();

  const filteredChampions = [...champions].length
    ? champions.filter((champion) =>
        champion.name.toLowerCase().includes(searchChampion.toLowerCase())
      )
    : [];

    const forceUpdate = useCallback(() => {updateChampions; updateChampions}, [updateChampions]);

  return (
    <div
      className="overflow-x-hidden h-[40rem] w-screen max-w-5xl border-4 rounded-md border-gray-400 cursor-pointer 
      scroll scrollbar scrollbar-track-transparent scrollbar-thumb-gray-200 scrollbar-thumb-rounded-md"
    >
      <div className="grid grid-cols-10 m-3 p-3 gap-3 items-center">
        {filteredChampions.map((champion) => (
          <div key={champion.id} onClick={() => {}}>
            {champion.draftable === true && (
              <Image
                width={75}
                height={75}
                src={champion.image}
                alt={champion.name}
                onClick={() => {
                  pickOrBanChampion(champion);
                  selectSlot(null);
                }}
              />
            )}{" "}
            {champion.draftable === false && (
              <Image
                width={75}
                height={75}
                src={champion.image}
                alt={champion.name}
                className="grayscale"
                onClick={() => console.log(champion.draftable)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
