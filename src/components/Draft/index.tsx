import {
  DEFAULT_RED_SIDE_DRAFT_STATE,
  DEFAULT_BLUE_SIDE_DRAFT_STATE,
  DEFAULT_CHAMPION_STATE,
} from "@/server/utils/setDefaultValues";
import { Champion, Draft, DraftPositions } from "@/types/draft";
import { trpc } from "@/utils/trpc";
import { useState, useEffect, useCallback } from "react";
import { ChampionList } from "../Layout/ChampionList";
import { BlueSideBans } from "./BlueSideBans";
import { BlueSide } from "./BlueSidePicks";
import { RedSideBans } from "./RedSideBans";
import { RedSide } from "./RedSidePicks";

export function Draft() {
  const [redSide, setRedSide] = useState<Draft>(DEFAULT_RED_SIDE_DRAFT_STATE);
  const [blueSide, setBlueSide] = useState<Draft>(
    DEFAULT_BLUE_SIDE_DRAFT_STATE
  );
  const [champions, setChampions] = useState<Champion[]>([
    DEFAULT_CHAMPION_STATE,
  ]);
  const [champion, setChampion] = useState<Champion>(DEFAULT_CHAMPION_STATE);
  const [selectedSlot, selectSlot] = useState<DraftPositions>(null);
  const initialQuery = trpc.champion.fetchChampions.useQuery();

  useEffect(() => {
    const draftChampions = initialQuery.data?.map((data) => {
      return {
        ...data,
        draftable: true,
      };
    });
    setChampions(draftChampions!);
  }, [initialQuery.data]);

  const handlePick = useCallback(
    (selectedChampion: Champion, position: DraftPositions) => {
      if (selectedChampion.name.length == 0 || position === null) return;
      /* Pick or Ban Champion  */
      if (selectedChampion.name.length && position !== null) {
        if (
          selectedSlot &&
          (selectedSlot.startsWith("R") || selectedSlot === "LAST PICK")
        ) {
          setRedSide((prevState) => {
            const updatedPicks = prevState.picks.map((pick) => {
              if (pick.position === selectedSlot) {
                return {
                  ...pick,
                  champion: {
                    ...champion,
                    isDraftable: false,
                  },
                };
              }
              return pick;
            });
            return { ...prevState, picks: updatedPicks };
          });
        } else if (
          selectedSlot &&
          (selectedSlot.startsWith("B") || selectedSlot === "FIRST PICK")
        ) {
          setBlueSide((prevState) => {
            const updatedPicks = prevState.picks.map((pick) => {
              if (pick.position === selectedSlot) {
                return {
                  ...pick,
                  champion: {
                    ...champion,
                    isDraftable: false,
                  },
                };
              }
              return pick;
            });
            return { ...prevState, picks: updatedPicks };
          });
        } else if (
          (selectedSlot && selectedSlot.startsWith("L")) ||
          selectedSlot === "LAST BAN"
        ) {
          setRedSide((prevState) => {
            const updatedBans = prevState.bans.map((ban) => {
              if (ban.position === selectedSlot) {
                return {
                  ...ban,
                  champion: {
                    ...champion,
                    isDraftable: false,
                  },
                };
              }
              return ban;
            });
            return { ...prevState, bans: updatedBans };
          });
        } else if (
          selectedSlot &&
          (selectedSlot.startsWith("F") || selectedSlot === "FIRST BAN")
        ) {
          setBlueSide((prevState) => {
            const updatedBans = prevState.bans.map((ban) => {
              if (ban.position === selectedSlot) {
                return {
                  ...ban,
                  champion: {
                    ...champion,
                    isDraftable: false,
                  },
                };
              }
              return ban;
            });
            return { ...prevState, bans: updatedBans };
          });
        }
      }
      selectSlot(null);
      setChampion(
        DEFAULT_CHAMPION_STATE
      ); /*  check if champion is on either  */
    },
    [champion, selectedSlot]
  );

  const handleChampionDraftability = useCallback(() => {
    setChampions((prevState) => {
      if (!prevState) return [];
      return prevState.map((champ) => {
        const isDrafted =
          redSide.picks.some((pick) => pick.champion.id === champ.id) ||
          redSide.bans.some((ban) => ban.champion.id === champ.id) ||
          blueSide.picks.some((pick) => pick.champion.id === champ.id) ||
          blueSide.bans.some((ban) => ban.champion.id === champ.id);

        champ.draftable = !isDrafted;
        return champ;
      });
    });
  }, [blueSide, redSide]);

  useEffect(() => {
    handlePick(champion, selectedSlot);
    handleChampionDraftability();
  }, [champion, selectedSlot, handlePick, handleChampionDraftability]);

  function handleClickChampion(selectedChampion: Champion) {
    setChampion(selectedChampion);
  }

  function RenderChampions() {
    if (champions) {
      return (
        <ChampionList
          champions={champions}
          selectedChampion={champion}
          handleClickChampion={handleClickChampion}
        />
      );
    } else {
      return <>Loading</>;
    }
  }

  return (
    <>
      <main className="flex gap-16">
        <BlueSide blueSide={blueSide} selectSlot={selectSlot} />
        {RenderChampions()}
        <RedSide redSide={redSide} selectSlot={selectSlot} />
      </main>
      <footer className="flex items-center justify-evenly mt-4 gap-16">
        <BlueSideBans blueSide={blueSide} selectSlot={selectSlot} />
        <RedSideBans redSide={redSide} selectSlot={selectSlot} />
      </footer>
    </>
  );
}
