import type { NextPage } from "next";
import { MenuProvider } from "@/context/MenuContext";
import { DraftProvider } from "@/context/DraftContext";
import { Draft } from "@/components/Draft";
import { useCallback, useEffect, useState } from "react";
import { Champion, GameSeries, Draft as DraftType, Game } from "@/types/draft";
import {
  DEFAULT_BLUE_SIDE_DRAFT_STATE,
  DEFAULT_BO1_STATE,
  DEFAULT_GAME_STATE,
  DEFAULT_MATCH_STATE,
  DEFAULT_RED_SIDE_DRAFT_STATE,
} from "@/server/utils/setDefaultValues";
import { Menu } from "@/components/Menu";
import { Navbar } from "@/components/Layout/Navbar";
import Head from "next/head";
import { trpc } from "@/utils/trpc";
import { useUser } from "@clerk/nextjs";
import { Draft as PrismaDraft } from "@prisma/client";

const Home: NextPage = () => {
  const user = useUser();
  const userId = user.user?.id!;
  const [drafts, setDrafts] = useState<PrismaDraft[] | undefined>([]);

  const { refetch } = trpc.draft.fetch.useQuery(
    {
      user_id: userId,
    },
    {
      enabled: false,
      refetchOnMount: false,
    }
  );

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

  const importDraft = useCallback((draft: GameSeries) => {
    setMatches(draft);
    if (draft.games.length >= 1){
      setRedSide(draft.games[0]!.redSide);
      setBlueSide(draft.games[0]!.blueSide);
    }
  }, []);

  const selectMatch = useCallback(
    (game: Game) => {
      setSelectedMatch(game);
      setRedSide(game.redSide);
      setBlueSide(game.blueSide);
    },
    [setBlueSide, setRedSide, setSelectedMatch]
  );

  const purgeDraft = useCallback(() => {
    setMatches(DEFAULT_BO1_STATE);
    setBlueSide(DEFAULT_BLUE_SIDE_DRAFT_STATE);
    setRedSide(DEFAULT_RED_SIDE_DRAFT_STATE);
    setSelectedMatch(matches.games[0]!);
  },[]);

  useEffect(() => {
    if (selectedMatch !== null) {
      // setMatches((prevMatches) => ({
      //   ...prevMatches,
      //   games: prevMatches.games.map((game, index) => {
      //     if (game.game === selectedMatch.game) {
      //       return {
      //         ...game,
      //         blueSide: blueSide,
      //         redSide: redSide,
      //       };
      //     } else {
      //       return game;
      //     }
      //   }),
      // }));
    }
  }, [blueSide, redSide, selectedMatch]);

  useEffect(() => {
    if (!selectedMatch) return;
    setBlueSide(selectedMatch?.blueSide);
    setRedSide(selectedMatch?.redSide);
  }, [selectedMatch, setSelectedMatch, importDraft]);

  useEffect(() => {
    async function fetchDrafts() {
      if (user) {
        const response = (await refetch()).data;
        if (response) setDrafts(response);
      }
    }
    fetchDrafts();
  }, [user, refetch]);


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
          <Navbar
            purgeDraft={purgeDraft}
            importDraft={importDraft}
            selectedMatch={selectedMatch}
          />
          <Menu selectMatch={selectMatch} />
          <main>
            <Draft />
          </main>
        </div>
      </DraftProvider>
    </MenuProvider>
  );
};

export default Home;
