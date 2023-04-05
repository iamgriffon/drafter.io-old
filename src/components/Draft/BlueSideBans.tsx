import { useDraft } from "@/context/DraftContext";
import Image from "next/image";

export function BlueSideBans() {
  const { blueSide, selectSlot } = useDraft();

  return (
    <div className="flex gap-3.5">
      {blueSide.bans.map((ban, index) => (
        <div className="flex flex-col gap-4 items-center justify-evenly" key={index}>
          <button className="border-4 border-gray-500 w-14 h-14 bg-slate-600 focus:border-gray-300"
          onClick={() => selectSlot(ban.position)}>
            { ban.champion.image.length >= 1 
            ? (<Image src={ban.champion.image} width={90} height={90} alt={ban.champion.name} />)
          : (<div className="w-full h-full " />) }
          </button>
        </div>
      ))}
    </div>
  );
}
