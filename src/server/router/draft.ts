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
      const newRegistry = await prisma.draft.create({
        data: {
          data: draft,
          link: link,
          userId: user_id,
          name: name,
        },
      });

      const selectedRegistry = await prisma.draft.findUnique({
        where: {
          id: newRegistry.id,
        },
      });
      return selectedRegistry;
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
      const res = await prisma.draft.findMany({
        where: {
          userId: user_id,
        },
      });
      return res;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        draft: z.record(z.any()),
      })
    )
    .mutation(async ({ input }) => {
      const { id, draft, name } = input;
      const getDraft = await prisma.draft.findFirst({
        where: {
          id: id,
        },
      });
      

      if (!getDraft) {
        console.log("Opa");
        return {
          message: "We were not able to find your draft, please try again later",
          success: false
        };
      }

      const res = await prisma.draft.update({
        where: {
          id: getDraft.id,
        },
        data: {
          data: draft,
          name: name,
        },
      });
      console.log("Opa 2");
      return {
        message: `${res.name} has been successfuly updated!`,
        success: true
      };
    }),
  delete: publicProcedure
    .input(z.object({
      id: z.string()
    }))
    .mutation(async ({input}) => {
      const { id } = input;

      const selectedDraft = await prisma.draft.findFirst({
        where: {
          id: id
        }
      });

      if (!selectedDraft) return { message: "An Error Occurred" };

      const deleteDraft = await prisma.draft.delete({
        where: {
          id: selectedDraft.id
        }
      }).then(res => res.data);

      if (deleteDraft) return { message: "Draft Deleted Successfully" };

    })
});
