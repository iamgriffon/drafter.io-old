import { DEFAULT_BO1_STATE, DEFAULT_BO3_STATE, DEFAULT_BO5_STATE } from "@/server/utils/setDefaultValues";
import { Game, GameSeries, MatchWinner } from "@/types/draft";
import { trpc } from "@/utils/trpc";
import React, {
  ChangeEvent,
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
  selectFirstGame: () => void;
  handlePickSeries: (Event: ChangeEvent<HTMLSelectElement>) => void;
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
    if (!selectedMatch || !winnerTeam) return;
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
      setWinnerTeam(null);
    }
  }, [selectedMatch, winnerTeam, setMatches]);

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
  
  useEffect(() => {
    const seriesWinner = detectSeriesWinner(matches.games);
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
  
  function purgeGameWinners(){
    setMatches(matches => {
      const purgeGames = matches.games.map(games => {
        return {
          ...games,
          winner: null
        };
      });
      return {
        ...matches,
        winner: null,
        games: purgeGames
      };
    });
  }

  function filterChampionBySearch(champion: string) {
    setSearchChampion(champion);
  }

  const selectFirstGame = useCallback(() => {
    if (matches.games.length > 0)setSelectedMatch(matches.games[0]!);
  },[matches.games, setSelectedMatch]);


  const handlePickSeries = useCallback((Event: ChangeEvent<HTMLSelectElement>) => {
    Event.stopPropagation();
    const { value } = Event.target;

    switch (value) {
    case "BO1":
      setMatches(DEFAULT_BO1_STATE);
      break;
    case "BO3":
      setMatches(DEFAULT_BO3_STATE);
      break;
    case "BO5":
      setMatches(DEFAULT_BO5_STATE);
      break;
    default: 
      return;
    }
    selectFirstGame();
  },[setMatches, selectFirstGame]);

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
        purgeGameWinners,
        selectFirstGame,
        handlePickSeries
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
