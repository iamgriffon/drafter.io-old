import { useMenu } from "@/context/MenuContext";

export function GamePickerButtons() {
  const { matches, selectMatch } = useMenu();

  const hasWinner = (winner: 'red' | 'blue' | string) => {
    switch(winner){
      case 'red': return 'inline-block transform -skew-x-12 border-red-500 text-red-500 px-4 py-2 mt-1 overflow-hidden font-bold border-4 focus:border-2';
      case 'blue': return 'inline-block transform -skew-x-12 border-blue-500 text-blue-500 px-4 py-2 mt-1 overflow-hidden border-2 font-bold border-4 focus:border-2';
      default: return 'inline-block transform -skew-x-12 border-2 text-white px-4 py-2 mt-1 overflow-hidden font-bold border-2 focus:border-4'
    }
  }

  return (
    <div className="flex gap-3 relative">
      {matches
        ? matches.map((match, index) => (
            <div key={index}>
              {match.winner && (
                <button
                  key={index}
                  className={`${
                    hasWinner(match.winner)
                  }`}
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
          ))
        : null}
    </div>
  );
}
