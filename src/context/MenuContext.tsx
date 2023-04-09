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
  activeIndex: number;
  champions: Champion[] | undefined;
  matches: GameSeries;
  setMatches: Dispatch<SetStateAction<GameSeries>>;
  searchChampion: string;
  stageMode: boolean;
  winnerTeam: MatchWinner;
  filterChampionBySearch: (param: string) => void;
  handleToggle: () => void;
  selectedMatch: Game | null;
  setSelectedMatch: Dispatch<SetStateAction<Game | null>>;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  setWinnerTeam: Dispatch<SetStateAction<MatchWinner>>;
  isGameOver: boolean;
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
  const [activeIndex, setActiveIndex] = useState(0);

  
  const setCounter = useCallback(() => {
    if (isGameOver) return;
    else {
      setActiveIndex(activeIndex + 1);
    }
  }, [isGameOver, activeIndex]);


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
      setCounter()
    }
  }, [selectedMatch, winnerTeam, setMatches, setSelectedMatch, setCounter]);

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

  const spliceGamesArray = useCallback(
    (games: Game[]): Game[] => {
      const seriesWinner = detectSeriesWinner(games);
      if (stageMode && seriesWinner) {
        const totalMatches = games.reduce((acc, game) => {
          if (game.winner === "red" || game.winner === "blue") {
            acc++;
          }
          return acc;
        }, 0);
        return games.slice(0, totalMatches);
      } else {
        return games;
      }
    },
    [stageMode, detectSeriesWinner]
  );

  useEffect(() => {
    const seriesWinner = detectSeriesWinner(matches.games);
    const splicedGames = spliceGamesArray(matches.games);

    if (seriesWinner !== matches.winner) {
      setMatches((prevMatches) => ({ ...prevMatches, winner: seriesWinner }));
    }


    if (JSON.stringify(splicedGames) !== JSON.stringify(matches.games)) {
      setMatches((prevMatches) => ({ ...prevMatches, games: splicedGames }));
      setIsGameOver(true);
    }
  }, [
    matches,
    detectSeriesWinner,
    spliceGamesArray,
    setMatches,
    setSelectedMatch,
  ]);

  useEffect(() => {
    handleSetGameWinner();
  }, [handleSetGameWinner, selectedMatch, setSelectedMatch]);

  useEffect(() => {}, [isGameOver, activeIndex]);

  function handleToggle() {
    setStageMode(!stageMode);
    if (stageMode.valueOf() === false) setIsGameOver(false);
    setMatches((prevState) => {
      const updatedMatches = prevState.games.map((game) => {
        if (selectedMatch?.game === game.game) {
          return {
            ...game,
            winner: selectedMatch.winner,
          };
        } else {
          return {
            ...game,
            winner: null,
          };
        }
      });
      return {
        ...prevState,
        games: updatedMatches,
      };
    });
    setActiveIndex(0);
    setSelectedMatch(null);
  }

  function filterChampionBySearch(champion: string) {
    setSearchChampion(champion);
  }

  return (
    <MenuContext.Provider
      value={{
        matches,
        isGameOver,
        setMatches,
        selectedMatch,
        setSelectedMatch,
        stageMode,
        handleToggle,
        searchChampion,
        filterChampionBySearch,
        champions,
        winnerTeam,
        setWinnerTeam,
        activeIndex,
        setActiveIndex,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
