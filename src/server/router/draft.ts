import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../utils/prisma";

export const draftRouter = createTRPCRouter({
  export: publicProcedure
    .input(
      z.object({
        user_id: z.string().nonempty(),
        draft: z.record(z.any()),
        link: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { user_id, draft, link, name } = input;
      return await prisma.draft.create({
        data: {
          data: draft,
          link: link,
          userId: user_id,
          name: name,
        },
      });
    }),

  import: publicProcedure
    .input(
      z.object({
        link: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { link } = input;
      return await prisma.draft.findFirstOrThrow({
        where: {
          link: link,
        },
      });
    }),
  fetch: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { user_id } = input;
      await prisma.draft.findMany({
        where: {
          userId: user_id,
        },
      });
    }),
});
