import type { NextPage } from "next";
import { Layout } from "@/components/Layout";
import { MenuProvider } from "@/context/MenuContext";
import { DraftProvider } from "@/context/DraftContext";
import { Draft } from "@/components/Draft";

const Home: NextPage = () => {
  return (
    <DraftProvider>
      <MenuProvider>
        <Layout>
        <Draft />
        </Layout>
      </MenuProvider>
    </DraftProvider>
  );
};

export default Home;
