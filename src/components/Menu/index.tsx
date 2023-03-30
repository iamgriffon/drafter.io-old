import { useState } from "react";
import { GameSeriesPicker } from "./GamePicker";
import { GamePickerButtons } from "./GamePickerButtons";
import { SearchBox } from "./SearchBox";
import { Switch } from "./Switch";

type GameType  = {
  game: number;
  winner?: 'red' | 'blue' | 'not' | null
}

export type GameSeries = GameType[]

export function Menu() {
  const DEFAULT_VALUE: GameSeries = [{game: 1, winner: null}];
  const [matchType, setMatchType] = useState<GameSeries>(DEFAULT_VALUE);
  
  function setBestOfSeries(series: GameSeries){
    setMatchType(series)
  }

  return (
    <div className="flex flex-row py-4 px-8 w-full max-w-[1440px] mb-3">
      <div className="flex flex-row items-stretch gap-8 justify-between">
        <Switch />
        <SearchBox />
        <GameSeriesPicker setBOSeries={setBestOfSeries}  />
        <GamePickerButtons matches={matchType} />
      </div>
    </div>
  );
}
