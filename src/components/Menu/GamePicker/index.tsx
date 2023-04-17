import { useMenu } from "@/context/MenuContext";

export function GameSeriesPicker() {
  const { handlePickSeries } = useMenu();

  return (
    <div className="flex items-center justify-center">
      <select
        onChange={(e) => handlePickSeries(e)}
        className="rounded-md text-sm font-bold bg-gray-700 px-3 h-10 [text-align-last:center] justify-center appearance-none cursor-pointer"
      >
        <option value="DEFAULT" defaultChecked>Select Series</option>
        <option value="BO1">Best of 1</option>
        <option value="BO3">Best of 3</option>
        <option value="BO5">Best of 5</option>
      </select>
    </div>
  );
}
