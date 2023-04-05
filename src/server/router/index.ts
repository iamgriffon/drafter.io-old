import { z } from "zod";
import { createTRPCRouter } from "../trpc";
import { championRouter } from "./champions";

export const appRouter = createTRPCRouter({
  champion: championRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
