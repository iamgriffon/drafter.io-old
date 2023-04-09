import type { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { MenuProvider } from "@/context/MenuContext";
import { DraftProvider } from "@/context/DraftContext";
import { Draft } from "@/components/Draft";
import { useEffect, useState } from "react";
import { Champion, GameSeries, Draft as DraftType, Game } from "@/types/draft";
import {
  DEFAULT_BLUE_SIDE_DRAFT_STATE,
  DEFAULT_GAME_STATE,
  DEFAULT_MATCH_STATE,
  DEFAULT_RED_SIDE_DRAFT_STATE,
} from "@/server/utils/setDefaultValues";

const Home: NextPage = () => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [matches, setMatches] = useState<GameSeries>(DEFAULT_MATCH_STATE);
  const [redSide, setRedSide] = useState<DraftType>(
    DEFAULT_RED_SIDE_DRAFT_STATE
  );
  const [blueSide, setBlueSide] = useState<DraftType>(
    DEFAULT_BLUE_SIDE_DRAFT_STATE
  );
  const [selectedMatch, setSelectedMatch] = useState<Game | null>(DEFAULT_GAME_STATE);

  useEffect(() => {
    if (selectedMatch !== null) {
      setMatches((prevMatches) => ({
        ...prevMatches,
        games: prevMatches.games.map((game) => {
          if (game.game === selectedMatch.game) {
            return {
              ...game,
              blueSide: blueSide,
              redSide: redSide,
            };
          } else {
            return game;
          }
        }),
      }));
    }
  }, [blueSide, redSide, selectedMatch]);

  useEffect(() => {
    console.log("Updated Matches", matches.games);
  }, [matches]);

  useEffect(() => {
    if (!selectedMatch) return;
    setBlueSide(selectedMatch?.blueSide);
    setRedSide(selectedMatch?.redSide);
  },[selectedMatch, setSelectedMatch]);

  return (
    <MenuProvider
      champions={champions}
      matches={matches}
      setMatches={setMatches}
      selectedMatch={selectedMatch}
      setSelectedMatch={setSelectedMatch}
    >
      <DraftProvider
        blueSide={blueSide}
        setBlueSide={setBlueSide}
        setRedSide={setRedSide}
        redSide={redSide}
        champions={champions}
        setChampions={setChampions}
      >
        <Layout>
          <Draft />
        </Layout>
      </DraftProvider>
    </MenuProvider>
  );
};

export default Home;
