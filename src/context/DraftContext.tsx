import {
  DEFAULT_RED_SIDE_DRAFT_STATE,
  DEFAULT_BLUE_SIDE_DRAFT_STATE,
  DEFAULT_CHAMPION_STATE,
  DEFAULT_MATCH_STATE,
} from "@/server/utils/setDefaultValues";
import { Champion, Draft, DraftPositions, Game, GameSeries, Series } from "@/types/draft";
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
}

const DraftContext = createContext({} as DraftContextProps);

export const DraftProvider = ({ children }: DraftProviderProps) => {
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
  const [series, setSeries] = useState<GameSeries>(DEFAULT_MATCH_STATE);

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
      );
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

  useEffect(() => {
    const draftChampions = initialQuery.data?.map((data) => {
      return {
        ...data,
        draftable: true,
      };
    });
    setChampions(draftChampions!);
  }, [initialQuery.data]);


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
        handleClickChampion
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};

export const useDraft = () => useContext(DraftContext);
