import { useMenu } from "@/context/MenuContext";

export function GameSeriesPicker() {
  const { handlePickSeries, matches } = useMenu();
  return (
    <div className="flex items-center justify-center">
      <select
        value={matches.games.length == 0 ? "DEFAULT" : matches.series}
        onChange={(e) => {
          e.stopPropagation();
          const value = e.target.value;
          handlePickSeries(value);
        }}
        className="rounded-md text-sm font-bold bg-gray-700 px-3 h-10 [text-align-last:center] justify-center appearance-none cursor-pointer"
      >
        <option value="DEFAULT" defaultChecked={matches.games.length == 0}>Select Series</option>
        <option value="BO1" defaultChecked={matches.series == "BO1"}>Best of 1</option>
        <option value="BO3" defaultChecked={matches.series == "BO3"}>Best of 3</option>
        <option value="BO5" defaultChecked={matches.series == "BO5"}>Best of 5</option>
      </select>
    </div>
  );
}
