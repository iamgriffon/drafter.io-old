import { useDraft } from "@/context/DraftContext";
import { useMenu } from "@/context/MenuContext";
import { ChampionList } from "../Layout/ChampionList";
import { BlueSideBans } from "./BlueSideBans";
import { BlueSide } from "./BlueSidePicks";
import { RedSideBans } from "./RedSideBans";
import { RedSide } from "./RedSidePicks";

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
        <BlueSide isWinner={isWinner} blueSide={blueSide} selectSlot={selectSlot} />
        {RenderChampions()}
        <RedSide isWinner={isWinner} redSide={redSide} selectSlot={selectSlot} />
      </main>
      <footer className="flex items-center justify-evenly mt-4 gap-16">
        <BlueSideBans blueSide={blueSide} selectSlot={selectSlot} />
        <RedSideBans redSide={redSide} selectSlot={selectSlot} />
      </footer>
    </>
  );
}
