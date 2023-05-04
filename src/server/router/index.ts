import { createTRPCRouter } from "../trpc";
import { championRouter } from "./champions";
import { draftRouter } from "./draft";

export const appRouter = createTRPCRouter({
  champion: championRouter,
  draft: draftRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
