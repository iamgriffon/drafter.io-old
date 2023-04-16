import { useMenu } from "@/context/MenuContext";
import {
  DEFAULT_BO1_STATE,
  DEFAULT_BO3_STATE,
  DEFAULT_BO5_STATE,
} from "@/server/utils/setDefaultValues";
import { ChangeEvent, useCallback, useEffect } from "react";

export function GameSeriesPicker() {
  const { setMatches, setSelectedMatch, matches, selectFirstGame } = useMenu();

  const handlePickSeries = useCallback((Event: ChangeEvent<HTMLSelectElement>) => {
    Event.stopPropagation();
    const { value } = Event.target;

    switch (value) {
      case "BO1":
          setMatches(DEFAULT_BO1_STATE);
          break;
      case "BO3":
          setMatches(DEFAULT_BO3_STATE);
          break;
      case "BO5":
          setMatches(DEFAULT_BO5_STATE);
          break;
      default: 
        return;
    }
    selectFirstGame();
  },[setMatches, selectFirstGame]);

    useEffect(() => {
      setSelectedMatch(matches.games[0]!);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


  return (
    <div className="flex items-center justify-center">
      <select
        onChange={(e) => handlePickSeries(e)}
        className="rounded-md font-bold bg-gray-700 w-full px-3 h-10 [text-align-last:center] justify-center appearance-none cursor-pointer"
      >
        <option value="DEFAULT" defaultChecked>-----</option>
        <option value="BO1">Best of 1</option>
        <option value="BO3">Best of 3</option>
        <option value="BO5">Best of 5</option>
      </select>
    </div>
  );
}
