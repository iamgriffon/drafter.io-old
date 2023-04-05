import { useState } from "react";
import { GameSeriesPicker } from "./GamePicker";
import { GamePickerButtons } from "./GamePickerButtons";
import { SearchBox } from "./SearchBox";
import { Switch } from "./Switch";
import { WinnerPicker } from "./WinnerPicker";

export type GameType  = {
  game: number;
  winner?: 'red' | 'blue' | 'not' | null
}

export type GameSeries = GameType[]

export function Menu() {
  return (
    <div className="flex flex-row py-4 px-8 w-full max-w-[1440px] mb-3">
      <div className="flex flex-row items-stretch gap-8 justify-between">
        <Switch />
        <SearchBox />
        <GameSeriesPicker />
        <GamePickerButtons />
        <WinnerPicker />
      </div>
    </div>
  );
}
