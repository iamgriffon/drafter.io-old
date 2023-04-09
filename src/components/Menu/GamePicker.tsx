import { ChangeEvent } from "react";
import { OPTIONS } from "@/utils/gameOptions";
import { useMenu } from "@/context/MenuContext";

export function GameSeriesPicker() {

  const { setMatches } = useMenu();

  function getValueById(Event: ChangeEvent<HTMLSelectElement>){
    const { value } = Event.currentTarget
    const getValue = OPTIONS.find(option => option.id == value)?.value!;
    if (getValue) setMatches(getValue);
  }

  return (
    <div className="flex justify-center items-center gap-4">
      <p className="font-bold  ">Series: </p>
      <select
        className="rounded-md font-bold bg-gray-700 px-4 h-10 justify-center items-center appearance-none [text-align-last:center] cursor-pointer"
        onChange={(e) => getValueById(e)}
      >
        {OPTIONS.map((option, index) => (
          <option key={index} className="pb-2" value={option.id}>
            {option.type}
          </option>
        ))}
      </select>
    </div>
  );
}
