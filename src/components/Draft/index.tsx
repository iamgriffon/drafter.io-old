import { useDraft } from "@/context/DraftContext";
import { useMenu } from "@/context/MenuContext";
import { ChampionList } from "../Layout/ChampionList";
import { SideBans } from "./SideBans";
import { SidePicks } from "./SidePicks";

export function Draft() {
    
  const { blueSide, redSide, champion, selectSlot, champions, handleClickChampion } = useDraft();

  const { matches } = useMenu();

  const isWinner = matches.winner;

  function RenderChampions() {
    if (champions) {
      return (
        <ChampionList
          champions={champions}
          selectedChampion={champion}
          handleClickChampion={handleClickChampion}
        />
      );
    } else {
      return <>Loading</>;
    }
  }

  return (
    <>
      <main className="flex gap-16">
        <SidePicks title="BLUE SIDE" isWinner={isWinner} side={blueSide} selectSlot={selectSlot} />
        {RenderChampions()}
        <SidePicks title="RED SIDE" isWinner={isWinner} side={redSide} selectSlot={selectSlot} />
      </main>
      <footer className="flex items-center justify-evenly mt-4 gap-16">
        <SideBans side={blueSide} selectSlot={selectSlot} />
        <SideBans side={redSide} selectSlot={selectSlot} />
      </footer>
    </>
  );
}
