import { Draft, DraftPositions } from "@/types/draft";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface RedSideBansProps {
  redSide: Draft
  selectSlot: Dispatch<SetStateAction<DraftPositions>>
}

export function RedSideBans({redSide, selectSlot}: RedSideBansProps) {
  return (
    <div className="flex gap-3.5 -mt-3">
      {redSide.bans.map((ban, index) => (
        <div className="flex flex-col gap-4 items-center justify-evenly" key={index}>
          <button className="border-4 border-gray-400 w-14 h-14 bg-slate-600 focus:border-gray-300"
            onClick={() => selectSlot(ban.position)}>
            { ban.champion.image.length >= 1 
              ? (<Image src={ban.champion.image} width={90} height={90} alt={ban.champion.name} />)
              : (<div className="w-full h-full " />) }
          </button>
          <span className="text-sm">{ban.position}</span>
        </div>
      ))}
    </div>
  );
}
