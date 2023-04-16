import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from "../utils/prisma";

export const championRouter = createTRPCRouter({
  fetchChampions: publicProcedure.query(async ({ctx}) => {
    return await prisma.champion.findMany();
  }) 
});