import { useMenu } from "@/context/MenuContext";
import { useCallback, useEffect, useState } from "react";

const baseStyle =
	"inline-block transform text-[0.9rem] -skew-x-12 px-3 py-2 mt-1 w-20 overflow-hidden font-bold border-2 focus:border-4 disabled:border-gray-600 disabled:text-gray-600";

export function GamePickerButtons() {
  const { matches, setSelectedMatch, setMatches, stageMode } =
		useMenu();
  const [currentMatch, setCurrentMatch] = useState(0);

  useEffect(() => {
    const latestMatch = matches.games.findIndex((game) => game.winner === null);
    if (latestMatch >= 0) setCurrentMatch(latestMatch);
  }, [matches]);

  useEffect(() => {
    setCurrentMatch(0);
  }, [setMatches]);

  const watchForSeriesWinner = useCallback(() => {
    const blueWins = matches.games.filter(
      (game) => game.winner === "blue"
    ).length;
    const redWins = matches.games.filter(
      (game) => game.winner === "red"
    ).length;

    if (
      (stageMode &&
				blueWins > redWins &&
				blueWins >= Math.ceil(matches.games.length / 2)) ||
			(redWins > blueWins && redWins >= Math.ceil(matches.games.length / 2))
    ) {
      return matches.games.filter((match) => match.winner !== null);
    } else return matches.games;
  }, [stageMode, matches.games]);

  let pickerMatches = watchForSeriesWinner();

  return (
    <div className="flex gap-3 relative">
      {pickerMatches.map((game, index) => {
        const isDisabled = stageMode && index > currentMatch;

        const winnerStyle = () => {
          let styles;
          if (game.winner === "blue") {
            styles = `${baseStyle} border-blue-600 text-blue-600`;
          }
          if (game.winner === "red") {
            styles = `${baseStyle} border-red-600 text-red-600`;
          }
          if (game.winner === null) {
            styles = `${baseStyle} border-white text-white`;
          }
          return styles;
        };

        return (
          <button
            key={index}
            className={baseStyle + winnerStyle()}
            onClick={() => {
              setSelectedMatch(game);
            }}
            autoFocus={index === 0}
            disabled={isDisabled}
          >
						Game {game.game}
          </button>
        );
      })}
    </div>
  );
}
