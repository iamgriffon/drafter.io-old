import { useMenu } from "@/context/MenuContext";
import { DraftPositions, Draft, MatchWinner } from "@/types/draft";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FaCrown } from "react-icons/fa";

interface SidePicksProps {
	side: Draft;
	selectSlot: Dispatch<SetStateAction<DraftPositions>>;
	isWinner: MatchWinner;
	title: "RED SIDE" | "BLUE SIDE";
}

export function SidePicks({
  side,
  selectSlot,
  isWinner,
  title,
}: SidePicksProps) {
  const { stageMode } = useMenu();
  
  const styles = {
    red: {
      main: "flex items-center justify-start",
      picks: "flex gap-5 items-center justify-start"
    },
    blue: {
      main: "flex items-center justify-end",
      picks: "flex gap-5 items-center justify-end"
    }
  };

  return (
    <div className="flex flex-col justify-center text-2xl mt-4 gap-10">
      <div className={title === "BLUE SIDE" ? styles.blue.main: styles.red.main}>
        <h1 className="font-bold">{title}</h1>
        {stageMode && isWinner === "red" && title === "RED SIDE" && (
          <>
            <FaCrown
              className="mx-3"
              size={28}
            />{" "}
            <strong>GG!</strong>
          </>
        )}
        {stageMode && isWinner === "blue" && title === "BLUE SIDE" && (
          <>
            <FaCrown
              className="mx-3"
              size={28}
            />
            <strong>GG!</strong>{" "}
          </>
        )}
      </div>

      {side.picks.map((pick, index) => (
        <div
          className={title === "BLUE SIDE" ? styles.blue.picks : styles.red.picks}
          key={index}
        >
          {title === "BLUE SIDE" ? <span>{pick.position}</span> : null}
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
              <Image
                src="/champion_placeholder.webp"
                width={90}
                height={90}
                alt="placeholder"
                className="rounded-full"
              />
            )}
          </button>
          {title === "RED SIDE" ? <span>{pick.position}</span> : null}
        </div>
      ))}
    </div>
  );
}
