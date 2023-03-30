import { ChangeEvent } from "react";
import { GameSeries } from "@/components/Menu";

interface SeriesPickerProps {
  setBOSeries: (param: GameSeries) => void;
}

export function GameSeriesPicker({setBOSeries}: SeriesPickerProps) {
  const OPTIONS = [
    {
      type: "Best of 1",
      id: '1',
      value: [{ game: 1 }],
    },
    {
      type: "Best of 3",
      id: '3',
      value: [
        { game: 1, winner: null },
        { game: 2, winner: null },
        { game: 3, winner: null },
      ],
    },
    {
      type: "Best of 5",
      id: '5',
      value: [
        { game: 1, winner: null },
        { game: 2, winner: null },
        { game: 3, winner: null },
        { game: 4, winner: null },
        { game: 5, winner: null },
      ],
    },
  ];


  function getValueById(Event: ChangeEvent<HTMLSelectElement>){
    const { value } = Event.currentTarget
    const getValue = OPTIONS.find(option => option.id == value)!;
    if (value) setBOSeries(getValue?.value)
  }

  return (
    <div className="flex justify-center items-center gap-4">
      <p className="font-bold  ">Series: </p>
      <select
        className="rounded-md font-bold bg-gray-700 px-4 h-10 justify-center items-center appearance-none [text-align-last:center] cursor-pointer"
        onChange={(e) => getValueById(e)}
      >
        {OPTIONS?.map((option, index) => (
          <option key={index} className="pb-2" value={option.id}>
            {option.type}
          </option>
        ))}
      </select>
    </div>
  );
}
