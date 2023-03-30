import { GameSeries } from "@/components/Menu";

interface GamePickerProps {
  matches: GameSeries;
}

export function GamePickerButtons({ matches }: GamePickerProps) {
  return (
    <div className="flex gap-3">
      {matches
        ? matches.map((match, index) => (
            <>
              {match.winner !== "not" && (
                <button
                  key={index}
                  className={`${
                    match.winner
                      ? `inline-block transform -skew-x-12 border-2 border-${match.winner.toString()}-300 text-${match.winner.toString()}-300 px-4 py-2 overflow-hidden`
                      : "inline-block transform -skew-x-12 border-2 text-white px-4 py-2 overflow-hidden"
                  }`}
                >
                  Game {index + 1}
                </button>
              )}
            </>
          ))
        : null}
    </div>
  );
}
