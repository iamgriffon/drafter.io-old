import type { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { ChampionList } from "@/components/Layout/ChampionList";
import { MenuProvider } from "@/context/MenuContext";
import { BlueSide } from "@/components/Draft/BlueSidePicks";
import { RedSide } from "@/components/Draft/RedSidePicks";
import { RedSideBans } from "@/components/Draft/RedSideBans";
import { DraftProvider } from "@/context/DraftContext";
import { BlueSideBans } from "@/components/Draft/BlueSideBans";

const Home: NextPage = () => {
  return (
    <DraftProvider>
      <MenuProvider>
        <Layout>
          <main className="flex gap-16">
            <BlueSide />
            <ChampionList />
            <RedSide />
          </main>
          <footer className="flex items-center justify-evenly mt-4 gap-16">
            <BlueSideBans  />
            <RedSideBans />
          </footer>
        </Layout>
      </MenuProvider>
    </DraftProvider>
  );
};

export default Home;
