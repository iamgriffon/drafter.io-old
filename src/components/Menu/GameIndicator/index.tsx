import { useMenu } from "@/context/MenuContext";

export function GameIndicator() {
  const { selectedMatch, matches } = useMenu();

  return (
    <div className="flex items-center">
      {matches.games.length && selectedMatch ? (
        <>
          <p className="font-bold text-sm"> Drafting in:</p>
          <span className="text-sm px-2">Game {selectedMatch?.game}</span>
        </>
      ) : (
        <>
          <p className="font-bold text-sm"> Please select a series</p>
        </>
      )}
    </div>
  );
}
