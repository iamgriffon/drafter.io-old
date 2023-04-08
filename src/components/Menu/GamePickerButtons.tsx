import { useMenu } from "@/context/MenuContext";

export function GamePickerButtons() {
  const { matches, selectMatch, stageMode, activeIndex } = useMenu();

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

  return (
    <div className="flex gap-3 relative">
      {matches.games.map((match, index) => {
        if (stageMode) {
          if (index <= activeIndex) {
            return (
              <div key={index}>
                {match.winner ? (
                  <button
                    key={index}
                    className={`${hasWinner(match.winner)}`}
                    onBlur={() => {
                      selectMatch(match);
                    }}
                    onClick={() => {
                      selectMatch(match);
                    }}
                  >
                    Game {index + 1}
                  </button>
                ) : (
                  <button
                    key={index + 1}
                    className={`${hasWinner(null)}`}
                    onBlur={() => {
                      selectMatch(match);
                    }}
                    onClick={() => {
                      selectMatch(match);
                    }}
                  >
                    Game {index + 1}
                  </button>
                )}
              </div>
            );
          }
        } else {
          return (
            <div key={index}>
              {match.winner ? (
                <button
                  key={index}
                  className={`${hasWinner(match.winner)}`}
                  onBlur={() => {
                    selectMatch(match);
                  }}
                  onClick={() => {
                    selectMatch(match);
                  }}
                >
                  Game {index + 1}
                </button>
              ) : (
                <button
                  key={index + 1}
                  className={`${hasWinner(null)}`}
                  onBlur={() => {
                    selectMatch(match);
                  }}
                  onClick={() => {
                    selectMatch(match);
                  }}
                >
                  Game {index + 1}
                </button>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}
