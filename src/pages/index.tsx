import type { NextPage } from "next";
import { MenuProvider } from "@/context/MenuContext";
import { DraftProvider } from "@/context/DraftContext";
import { Draft } from "@/components/Draft";
import { useCallback, useEffect, useState } from "react";
import { Champion, GameSeries, Draft as DraftType, Game } from "@/types/draft";
import {
  DEFAULT_BLUE_SIDE_DRAFT_STATE,
  DEFAULT_BO1_STATE,
  DEFAULT_BO3_STATE,
  DEFAULT_BO5_STATE,
  DEFAULT_GAME_STATE,
  DEFAULT_MATCH_STATE,
  DEFAULT_RED_SIDE_DRAFT_STATE,
} from "@/server/utils/setDefaultValues";
import { Menu } from "@/components/Menu";
import { Navbar } from "@/components/Layout/Navbar";
import Head from "next/head";

const Home: NextPage = () => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [matches, setMatches] = useState<GameSeries>(DEFAULT_MATCH_STATE);
  const [redSide, setRedSide] = useState<DraftType>(
    DEFAULT_RED_SIDE_DRAFT_STATE
  );
  const [blueSide, setBlueSide] = useState<DraftType>(
    DEFAULT_BLUE_SIDE_DRAFT_STATE
  );
  const [selectedMatch, setSelectedMatch] = useState<Game | null>(
    DEFAULT_GAME_STATE
  );

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

  const importDraft = useCallback(
    (draft: GameSeries) => {
      setMatches(draft);
      setRedSide(draft.games[0]!.redSide);
      setBlueSide(draft.games[0]!.blueSide);
    },
    [setMatches]
  );
  
  useEffect(() => {
    if (!selectedMatch) return;
    setBlueSide(selectedMatch?.blueSide);
    setRedSide(selectedMatch?.redSide);
  }, [selectedMatch, setSelectedMatch, importDraft]);

  function purgeDraft() {
    const getMatchType = matches.series;
    let purgedPicks;
    switch (getMatchType) {
    case "BO1":
      purgedPicks = DEFAULT_BO1_STATE;
      break;
    case "BO3":
      purgedPicks = DEFAULT_BO3_STATE;
      break;
    case "BO5":
      purgedPicks = DEFAULT_BO5_STATE;
      break;
    };
    setMatches(purgedPicks);
  };
 

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
        <div className="bg-gray-800 w-full h-[100vh] flex flex-col justify-start items-center">
          <Head>
            <title>Drafter.io - Home</title>
          </Head>
          <Navbar purgeDraft={purgeDraft} importDraft={importDraft} />
          <Menu />
          <main>
            <Draft />
          </main>
        </div>
      </DraftProvider>
    </MenuProvider>
  );
};

export default Home;
