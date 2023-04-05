import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  DEFAULT_BLUE_SIDE_DRAFT_STATE,
  DEFAULT_RED_SIDE_DRAFT_STATE,
} from "@/server/utils/setDefaultValues";
import { trpc } from "@/utils/trpc";

type BlueSidePickPosition = "FIRST PICK" | "B2" | "B3" | "B4" | "B5";
type RedSidePickPosition = "R1" | "R2" | "R3" | "R4" | "LAST PICK";
type BlueSideBanPosition = "FIRST BAN" | "F2" | "F3" | "F4" | "F5";
type RedSideBanPosition = "L1" | "L2" | "L3" | "L4" | "LAST BAN";

type Champion = {
  id: string;
  name: string;
  image: string;
  draftable: boolean | null;
};

type DraftPick = {
  position: BlueSidePickPosition | RedSidePickPosition;
  champion: Champion;
};

type DraftBan = {
  position: BlueSideBanPosition | RedSideBanPosition;
  champion: Champion;
};

export type Draft = {
  picks: DraftPick[];
  bans: DraftBan[];
};

type DraftPositions =
  | RedSidePickPosition
  | BlueSidePickPosition
  | RedSideBanPosition
  | BlueSideBanPosition
  | null;

interface DraftContextProps {
  redSide: Draft;
  blueSide: Draft;
  selectedSlot: DraftPositions;
  updateChampions: () => void;
  selectSlot: (param: DraftPositions) => void;
  pickOrBanChampion: (param: Champion) => void;
  champions: Champion[];
  searchChampion: string;
  filterChampionBySearch: (param: string) => void;
  draftChampion: (param: Champion) => void;
}

interface DraftProviderProps {
  children: ReactNode;
}

const DraftContext = createContext({} as DraftContextProps);

export const DraftProvider = ({ children }: DraftProviderProps) => {
  const [searchChampion, setSearchChampion] = useState("");
  const [champions, setChampions] = useState<Champion[]>([]);
  const initialQuery = trpc.champion.fetchChampions.useQuery();
  const [redSide, setRedSide] = useState<Draft>(DEFAULT_RED_SIDE_DRAFT_STATE);
  const [blueSide, setBlueSide] = useState<Draft>(
    DEFAULT_BLUE_SIDE_DRAFT_STATE
  );
  const [selectedSlot, setSelectSlot] = useState<DraftPositions>("FIRST PICK");

  useEffect(() => {
    if (!initialQuery.isLoading && !initialQuery.data) {
      initialQuery.refetch();
    }
  }, [initialQuery]);

  useEffect(() => {
    const draftChampions = initialQuery.data?.map((data) => {
      return {
        ...data,
        draftable: true,
      };
    });
    setChampions(draftChampions!);
  }, [initialQuery.data]);

  useEffect(() => {
    setChampions(champions);
  }, [champions]);

  function draftChampion(champion: Champion) {

    const isSelected = redSide.picks.some((pick) => pick.champion.name === champion.name) ||
    redSide.bans.some((ban) => ban.champion.name === champion.name) ||
    blueSide.picks.some((pick) => pick.champion.name === champion.name) ||
    blueSide.bans.some((ban) => ban.champion.name === champion.name);

    console.log('isSelected?', isSelected);

    const isAvaiable = redSide.picks.every((pick) => pick.champion.name !== champion.name) &&
    redSide.bans.every((ban) => ban.champion.name !== champion.name) &&
    blueSide.picks.every((pick) => pick.champion.name !== champion.name) &&
    blueSide.bans.every((ban) => ban.champion.name !== champion.name);

    console.log('can I pick it?', isAvaiable);
    console.log(champion.name);
    
      if(isSelected) {
        setChampions((prevState) => {
          const updatedChampions = prevState.map((champ) => {
            if (champ.id === champion.id) champ.draftable = !isSelected;
            return champ;
          });
          return updatedChampions;
        });
        console.log(champions.find((champ) => champ.draftable == champion.draftable));
      } else if (isAvaiable) {
        setChampions((prevState) => {
          const updatedChampions = prevState.map((champ) => {
            if (champ.id === champion.id) champ.draftable = !isAvaiable;
            return champ;
          });
          return updatedChampions;
        });
      };

      setChampions((prevState) => {
        const updatedChampions = prevState.map((champ) => {
          if (champ.id === champion.id) champ.draftable = isSelected;
            else if (champ.id === champion.id) champ.draftable = isAvaiable;
          return champ;
        });
        return updatedChampions;
      });
        setChampions(champions);
      console.log(champions.find((champ) => champ.id == champion.id));
  }

  function updateChampions(){
    setChampions(champions)
  }

  function pickOrBanChampion(champion: Champion) {
    if (selectSlot === null) return;
    else if (
      selectedSlot &&
      (selectedSlot.startsWith("R") || selectedSlot === "LAST PICK")
    ) {
      setRedSide((prevState) => {
        const updatedPicks = prevState.picks.map((pick) => {
          if (pick.position === selectedSlot) {
            return { ...pick, champion };
          }
          return pick;
        });
        return { ...prevState, picks: updatedPicks };
      });
      draftChampion(champion)
    } else if (
      selectedSlot &&
      (selectedSlot.startsWith("B") || selectedSlot === "FIRST PICK")
    ) {
      setBlueSide((prevState) => {
        const updatedPicks = prevState.picks.map((pick) => {
          if (pick.position === selectedSlot) {
            return { ...pick, champion };
          }
          return pick;
        });
        return { ...prevState, picks: updatedPicks };
      });
      draftChampion(champion)
    } else if (
      (selectedSlot && selectedSlot.startsWith("L")) ||
      selectedSlot === "LAST BAN"
    ) {
      setRedSide((prevState) => {
        const updatedBans = prevState.bans.map((ban) => {
          if (ban.position === selectedSlot) {
            return { ...ban, champion };
          }
          return ban;
        });
        return { ...prevState, bans: updatedBans };
      });
      draftChampion(champion)
    } else if (
      selectedSlot &&
      (selectedSlot.startsWith("F") || selectedSlot === "FIRST BAN")
    ) {
      setBlueSide((prevState) => {
        const updatedBans = prevState.bans.map((ban) => {
          if (ban.position === selectedSlot) {
            return { ...ban, champion };
          }
          return ban;
        });
        return { ...prevState, bans: updatedBans };
      });
      draftChampion(champion)
    }   
  }

  function selectSlot(param: DraftPositions) {
    setSelectSlot(param);
  }

  function filterChampionBySearch(champion: string) {
    setSearchChampion(champion);
  }

  return (
    <DraftContext.Provider
      value={{
        redSide,
        blueSide,
        selectedSlot,
        selectSlot,
        pickOrBanChampion,
        champions,
        searchChampion,
        filterChampionBySearch,
        draftChampion,
        updateChampions
      }}
    >
      {children}
    </DraftContext.Provider>
  );
};

export const useDraft = () => useContext(DraftContext);
