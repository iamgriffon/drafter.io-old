import { useMenu } from "@/context/MenuContext";
import { Game } from "@/types/draft";

export function GamePickerButtons() {
  const hasWinner = (winner: "red" | "blue" | "not" | null) => {
    switch (winner) {
      case "red":
        return "inline-block transform -skew-x-12 border-red-500 text-red-500 px-3 py-2 mt-1 overflow-hidden font-bold border-4 focus:border-2";
      case "blue":
        return "inline-block transform -skew-x-12 border-blue-500 text-blue-500 px-3 py-2 mt-1 overflow-hidden border-2 font-bold border-4 focus:border-2";
      case null:
        return "inline-block transform -skew-x-12 border-2 text-white px-3 py-2 mt-1 overflow-hidden font-bold border-2 focus:border-4";
      default:
        return "inline-block transform -skew-x-12 border-2 text-white px-3 py-2 mt-1 overflow-hidden font-bold border-2 focus:border-4";
    }
  };
  const { matches, setSelectedMatch, selectedMatch, stageMode, activeIndex } =
    useMenu();

  function handleClick(match: Game){
    const currentMatchWinner = matches.games.find((match) => match.game === selectedMatch?.game)?.winner!
    setSelectedMatch({
      game: match.game, 
      blueSide: match.blueSide,
      redSide: match.redSide,
      winner: currentMatchWinner!
    })
  }

   
  return (
    <div className="flex gap-3 relative">
      {matches.games.map((match, index) => {
        if(stageMode && (index <= activeIndex)){
          return (
            <button
              key={index}
              className={`${hasWinner(match.winner)}}`}
              onClick={() => handleClick(match)}
            >
              Game {match.game}
            </button>
          );
        } else if(!stageMode) {
          return (
            <button
              key={index}
              className={`${hasWinner(match.winner)}`}
              onClick={() => handleClick(match)}
            >
              Game {match.game}
            </button>
          );
        }
      })}
    </div>
  );
}
