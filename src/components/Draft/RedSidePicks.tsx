import { useDraft } from "@/context/DraftContext";
import Image from 'next/image'

export function RedSide() {
const { selectSlot, redSide } = useDraft()

  return (
    <div className="flex flex-col text-2xl mt-4 gap-10">
      <div className="flex items-center justify-start">
        <h1 className="font-bold">RED SIDE</h1>
      </div>

      {redSide.picks.map((pick, index) => (
        <div className="flex gap-5 items-center justify-start" key={index}>
          <button
            className="border-4 rounded-full border-gray-500 w-20 h-20 bg-slate-600 focus:border-gray-300"
            onClick={() => selectSlot(pick.position)}
          >
             { pick.champion.image.length >= 1 ? (
              <Image src={pick.champion.image} className='rounded-full' width={90} height={90} alt={pick.champion.name} />
             ) : (
              <div className="w-full h-full " />
             ) }
          </button>
          <span>{pick.position}</span>
        </div>
      ))}
    </div>
  );
}
