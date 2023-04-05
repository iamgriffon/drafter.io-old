import type { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { ChampionList } from "@/components/ChampionList";
import { MenuContextProvider } from "@/context/MenuContext";

const Home: NextPage = () => {
  return (
    <MenuContextProvider>
      <Layout>
        <ChampionList />
      </Layout>
    </MenuContextProvider>
  );
};

export default Home;
