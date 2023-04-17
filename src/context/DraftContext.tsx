import {
  DEFAULT_CHAMPION_STATE,
} from "@/server/utils/setDefaultValues";
import {
  Champion,
  Draft,
  DraftPositions,
} from "@/types/draft";
import { trpc } from "@/utils/trpc";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
interface DraftContextProps {
  champion: Champion;
  champions: Champion[];
  blueSide: Draft;
  redSide: Draft;
  selectSlot: Dispatch<SetStateAction<DraftPositions>>;
  handleClickChampion: (param: Champion) => void;
}

interface DraftProviderProps {
  children: ReactNode;
  champions: Champion[];
  setChampions: Dispatch<SetStateAction<Champion[]>>;
  redSide: Draft;
  blueSide: Draft;
  setRedSide:  Dispatch<SetStateAction<Draft>>
  setBlueSide:  Dispatch<SetStateAction<Draft>>

}

const DraftContext = createContext({} as DraftContextProps);

export const DraftProvider = ({
  children,
  champions,
  setChampions,
  blueSide,
  redSide,
  setBlueSide,
  setRedSide,
}: DraftProviderProps) => {
  const [champion, setChampion] = useState<Champion>(DEFAULT_CHAMPION_STATE);
  const [selectedSlot, selectSlot] = useState<DraftPositions>(null);
  const initialQuery = trpc.champion.fetchChampions.useQuery();

  const handlePick = useCallback(
    (selectedChampion: Champion, position: DraftPositions) => {
      if (selectedChampion.name.length == 0 || position === null) return;
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
          (selectedSlot && selectedSlot.startsWith("L"))
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
      setChampion(DEFAULT_CHAMPION_STATE);
    },
    [champion, selectedSlot, setBlueSide, setRedSide]
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
  }, [blueSide, redSide, setChampions]);

  useEffect(() => {
    handlePick(champion, selectedSlot);
    handleChampionDraftability();
  }, [champion, selectedSlot, handlePick, handleChampionDraftability]);

  useEffect(() => {
    const draftChampions = initialQuery.data?.map((data) => {
      return {
        ...data,
        draftable: true,
      };
    });
    setChampions(draftChampions!);
  }, [initialQuery.data, setChampions]);

  
  function handleClickChampion(selectedChampion: Champion) {
    setChampion(selectedChampion);
  }

  return (
    <DraftContext.Provider
      value={{
        champion,
        champions,
        blueSide,
        redSide,
        selectSlot,
        handleClickChampion,
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};

export const useDraft = () => useContext(DraftContext);
