import { Game, GameSeries, MatchWinner } from "@/types/draft";
import { trpc } from "@/utils/trpc";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
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

interface MenuContextProps {
  champions: Champion[] | undefined;
  matches: GameSeries;
  setMatches: Dispatch<SetStateAction<GameSeries>>;
  selectedMatch: Game | null;
  setSelectedMatch: Dispatch<SetStateAction<Game | null>>; 
  searchChampion: string;
  filterChampionBySearch: (param: string) => void;
  stageMode: boolean;
  setStageMode: Dispatch<SetStateAction<boolean>>;
  winnerTeam: MatchWinner,
  setWinnerTeam: Dispatch<SetStateAction<MatchWinner>>
  isGameOver: boolean
  purgeGameWinners: () => void;
}

interface MenuProviderProps {
  children: ReactNode;
  champions: Champion[];
  matches: GameSeries;
  setMatches: Dispatch<SetStateAction<GameSeries>>;
  selectedMatch: Game | null;
  setSelectedMatch: Dispatch<SetStateAction<Game | null>>;
}

export const MenuContext = createContext<MenuContextProps>(
  {} as MenuContextProps
);

export const MenuProvider = ({
  children,
  champions,
  matches,
  setMatches,
  selectedMatch,
  setSelectedMatch,
}: MenuProviderProps) => {
  const [stageMode, setStageMode] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winnerTeam, setWinnerTeam] = useState<MatchWinner>(null);
  const [searchChampion, setSearchChampion] = useState("");
  const initialQuery = trpc.champion.fetchChampions.useQuery();

  const handleSetGameWinner = useCallback(() => {
    if (selectedMatch === null) return;
    if (selectedMatch && winnerTeam) {
      setMatches((prevState) => {
        return {
          ...prevState,
          games: prevState.games.map((match) => {
            if (match.game === selectedMatch.game) {
              return {
                ...match,
                winner: winnerTeam,
              };
            }
            return match;
          }),
        };
      });
      setSelectedMatch(null);
      setWinnerTeam(null);
    }
  }, [selectedMatch, winnerTeam, setMatches, setSelectedMatch]);

  const detectSeriesWinner = useCallback(
    (games: Game[]): MatchWinner | null => {
      const blueWins = games.filter((game) => game.winner === "blue").length;
      const redWins = games.filter((game) => game.winner === "red").length;

      if (blueWins > redWins && blueWins >= Math.ceil(games.length / 2)) {
        return "blue";
      } else if (redWins > blueWins && redWins >= Math.ceil(games.length / 2)) {
        return "red";
      } else {
        return null;
      }
    },
    []
  );
  function purgeGameWinners(){
    setMatches(matches => {
      const purgeGames = matches.games.map(games => {
        return {
          ...games,
          winner: null
        }
      });
      return {
        ...matches,
        winner: null,
        games: purgeGames
      }
    })
  };

  useEffect(() => {
    const seriesWinner = detectSeriesWinner(matches.games);;
    if (seriesWinner !== matches.winner) {
      setMatches((prevMatches) => ({ ...prevMatches, winner: seriesWinner }));
      setIsGameOver(true);
    }
  }, [
    matches,
    detectSeriesWinner,
    setMatches,
  ]);

  useEffect(() => {
    handleSetGameWinner();
  }, [handleSetGameWinner, selectedMatch, setSelectedMatch]);

  function filterChampionBySearch(champion: string) {
    setSearchChampion(champion);
  };

  return (
    <MenuContext.Provider
      value={{
        matches,
        setMatches,
        selectedMatch,
        setSelectedMatch,
        searchChampion,
        stageMode,
        setStageMode,
        filterChampionBySearch,
        champions,
        winnerTeam,
        setWinnerTeam,
        isGameOver,
        purgeGameWinners
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
