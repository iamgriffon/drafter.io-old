import {
  DEFAULT_BO3_STATE,
  DEFAULT_BO5_STATE,
  DEFAULT_MATCH_STATE,
} from "@/server/utils/setDefaultValues";
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
  matches: GameSeries;
  searchChampion: string;
  champions: Champion[] | undefined;
  stageMode: boolean;
  handleToggle: () => void;
  winnerTeam: MatchWinner;
  setWinnerTeam: Dispatch<SetStateAction<MatchWinner>>;
  setGameWinner: (param: "red" | "blue" | null) => void;
  setBOSeries: (param: GameSeries) => void;
  selectMatch: (param: Game) => void;
  filterChampionBySearch: (param: string) => void;
  activeIndex: number;
  clearIndex: () => void;
}

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuContext = createContext<MenuContextProps>(
  {} as MenuContextProps
);

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [matches, setMatches] = useState<GameSeries>(DEFAULT_MATCH_STATE);
  const [stageMode, setStageMode] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState({ red: 0, blue: 0 });
  const [winnerTeam, setWinnerTeam] = useState<MatchWinner>(null);
  const [selectedMatch, setSelectedMatch] = useState<Game | null>(null);
  const [searchChampion, setSearchChampion] = useState("");
  const [champions, setChampions] = useState<Champion[]>([]);
  const initialQuery = trpc.champion.fetchChampions.useQuery();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSetGameWinner = useCallback(() => {
    if (selectedMatch === null || winnerTeam === null) return;
    if (selectedMatch && winnerTeam) {
      const updatedMatches = matches.games.map((match) => {
        if (match.game === selectedMatch.game) {
          return {
            ...match,
            winner: winnerTeam,
          };
        }
        return match;
      });
      setMatches({
        ...matches,
        games: updatedMatches,
      });
      setWinnerTeam(null);
      setSelectedMatch(null);
      setActiveIndex(activeIndex + 1);
    }
  }, [matches, selectedMatch, winnerTeam, activeIndex]);

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
      setIsGameOver(true)
    }
  }, [matches, detectSeriesWinner, spliceGamesArray]);

  useEffect(() => {
    handleSetGameWinner();
  }, [handleSetGameWinner, selectedMatch, winnerTeam]);

  useEffect(() => {
    if (!initialQuery.isLoading && !initialQuery.data) {
      initialQuery.refetch();
    }
    setChampions(initialQuery.data!);
  }, [initialQuery]);

  useEffect(() => {
    setSelectedMatch(selectedMatch);
  }, [selectedMatch]);

  function handleToggle() {
    setStageMode(!stageMode);
    if (!stageMode) setActiveIndex(0);

    let cleanUp = matches;

    cleanUp.winner = "not";
    cleanUp.games = matches.games.map((game) => {
      return {
        ...game,
        winner: null,
      };
    });

    if (matches.series === "BO1") {
      cleanUp.games = DEFAULT_MATCH_STATE.games;
    }

    if (matches.series === "BO3") {
      cleanUp.games = DEFAULT_BO3_STATE.games;
    }

    if (matches.series === "BO5") {
      cleanUp.games = DEFAULT_BO5_STATE.games;
    }

    setMatches((prevState) => {
      return {
        ...prevState,
        winner: "not",
        games: cleanUp.games.map((clean) => {
          return {
            ...clean,
          };
        }),
      };
    });
    setIsGameOver(false)
  }

  function clearIndex(){
    setActiveIndex(0);
  }

  function setBOSeries(series: GameSeries) {
    setMatches(series);
  }

  function setGameWinner(winner: "red" | "blue" | null) {
    setSelectedMatch((prevState) => {
      if (prevState === null) return prevState;
      return {
        ...prevState,
        winner: winner,
      };
    });
  }

  function selectMatch(match: Game) {
    setSelectedMatch(match);
    setScore(score);
    setActiveIndex(activeIndex);
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
        stageMode,
        handleToggle,
        searchChampion,
        filterChampionBySearch,
        champions,
        winnerTeam,
        setWinnerTeam,
        activeIndex,
        clearIndex
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
