import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { Layout } from "@/components/Layout";

const Home: NextPage = () => {
  const { data } = trpc.hello.useQuery({ msg: "" });

  return (
    <Layout>
      <h1>Hello World</h1>
    </Layout>
  );
};

export default Home;
