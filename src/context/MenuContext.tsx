import { trpc } from "@/utils/trpc";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Champion = {
  id: string;
  name: string;
  image: string;
};

export type GameType = {
  game: number;
  winner: "red" | "blue" | "not" | string ;
};

export type GameSeries = GameType[];

interface MenuContextProviderProps {
  children: ReactNode;
}

interface MenuContextType {
  matches: GameSeries;
  setGameWinner: (param: "red" | "blue" | "not") => void;
  setBOSeries: (param: GameSeries) => void;
  selectMatch: (param: GameType) => void;
  searchChampion: string;
  filterChampionBySearch: (param: string) => void;
  champions: Champion[] | undefined;
}

export const MenuContext = createContext<MenuContextType>(
  {} as MenuContextType
);

export const MenuContextProvider = ({ children }: MenuContextProviderProps) => {
  const DEFAULT_VALUE: GameSeries = [{ game: 1, winner: 'not' }];
  const [matches, setMatchType] = useState<GameSeries>(DEFAULT_VALUE);
  const [selectedMatch, setSelectedMatch] = useState<GameType>({
    game: 1,
    winner: 'not',
  });

  const [searchChampion, setSearchChampion] = useState("");
  const [champions, setChampions] = useState<Champion[]>([]);
  const initialQuery = trpc.champion.fetchChampions.useQuery();

  useEffect(() => {
    if (!initialQuery.isLoading && !initialQuery.data) {
      initialQuery.refetch();
    }
    setChampions(initialQuery.data!);
  }, [initialQuery]);

  useEffect(() => {
    setMatchType(matches);
  }, [matches]);

  useCallback(() => {
    setSelectedMatch(selectedMatch);
    console.log('UseCallback')
  },[selectedMatch])

  function setBOSeries(series: GameSeries) {
    setMatchType(series);
  }

  function setGameWinner(winner: "red" | "blue" | "not") {
    setSelectedMatch((prevState) => {
      return {
        ...prevState,
        winner: winner,
      };
    });

    setMatchType((prevMatches) => {
      return prevMatches.map((match) => {
        if (match.game === selectedMatch.game) {
          return {
            ...match,
            winner: winner,
          };
        }
        return match;
      });
    });
  }

  function selectMatch(match: GameType) {
    setSelectedMatch(match);
  }

  function filterChampionBySearch(champion: string) {
    setSearchChampion(champion);
  }

  return (
    <MenuContext.Provider
      value={{
        matches,
        setGameWinner,
        setBOSeries,
        selectMatch,
        searchChampion,
        filterChampionBySearch,
        champions,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
