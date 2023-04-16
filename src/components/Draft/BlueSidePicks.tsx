import { useMenu } from "@/context/MenuContext";
import { DraftPositions, Draft, MatchWinner } from "@/types/draft";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FaCrown } from "react-icons/fa";

interface BlueSideProps {
  blueSide: Draft;
  selectSlot: Dispatch<SetStateAction<DraftPositions>>;
  isWinner: MatchWinner;
}

export function BlueSide({ blueSide, selectSlot, isWinner }: BlueSideProps) {

  const { stageMode } = useMenu();

  return (
    <div className="flex flex-col text-2xl mt-4 gap-10">
      <div className="flex items-center justify-end">
        <h1 className="font-bold">BLUE SIDE</h1>
        { stageMode && isWinner === "blue" && <><FaCrown className='mx-3' size={28} /><strong>GG!</strong> </>}
      </div>

      {blueSide.picks.map((pick, index) => (
        <div className="flex gap-5 items-center justify-end" key={index}>
          <span>{pick.position}</span>
          <button
            className="border-4 rounded-full border-gray-400 w-20 h-20 bg-slate-600 focus:border-gray-300"
            onClick={() => selectSlot(pick.position)}
          >
            {pick.champion.image.length >= 1 ? (
              <Image
                src={pick.champion.image}
                className="rounded-full"
                width={90}
                height={90}
                alt={pick.champion.name}
              />
            ) : (
              <div className="w-full h-full " />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
