import { GameIndicator } from "./GameIndicator";
import { GameSeriesPicker } from "./GamePicker";
import { GamePickerButtons } from "./GamePickerButtons";
import { SearchBox } from "./SearchBox";
import { Switch } from "./Switch";
import { WinnerPicker } from "./WinnerPicker";
import { useMenu } from "@/context/MenuContext";
import { Game } from "@/types/draft";

export interface MenuProps {
  selectMatch: (param: Game) => void;
}

export function Menu({selectMatch}: MenuProps) {

  const { searchChampion, filterChampionBySearch } = useMenu();

  return (
    <div className="flex flex-row py-4 px-8 w-full max-w-[1440px] mb-3">
      <div className="flex flex-row items-stretch gap-8 justify-between">
        <Switch />
        <SearchBox value={searchChampion} onChangeValue={filterChampionBySearch} />
        <GameSeriesPicker />
        <GamePickerButtons selectMatch={selectMatch} />
        <WinnerPicker />
        <GameIndicator />
      </div>
    </div>
  );
}
