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

      const findUnique = await prisma.draft.findFirst({
        where: {
          name: name
        }
      });

      if (findUnique) return { error: "Name already in use" };

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
      return { data: selectedRegistry };
    }),
  import: publicProcedure
    .input(
      z.object({
        link: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { link } = input;
      const res = await prisma.draft.findFirst({
        where: {
          link: link,
        },
      });
      if (res){
        return { data: res};
      } else {
        return { error: "No Draft Found" };
      }
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
        link: z.string(),
        name: z.string(),
        draft: z.record(z.any()),
      })
    )
    .mutation(async ({ input }) => {
      const { link, draft, name } = input;
      const getDraft = await prisma.draft.findFirst({
        where: {
          link: link,
        },
      });

      if (!getDraft) {
        return {
          message:
						"We were not able to find your draft, please try again later",
          success: false,
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
      return {
        message: `${res.name} has been successfuly updated!`,
        success: true,
      };
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
        user_id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, user_id } = input;

      const selectedDraft = await prisma.draft.findFirstOrThrow({
        where: {
          id: id,
        },
      });

      const isDraftOwner = selectedDraft.id === id;

      if (selectedDraft && isDraftOwner) {
        const deleteDraft = await prisma.draft
          .delete({
            where: {
              id: selectedDraft.id,
            },
          })
          .then((res) => res.data);

        if (deleteDraft) return { message: "Draft Deleted Successfully" };
      } else if (!isDraftOwner){
        return { message: "Error when deleting draft, Insufficient permissions" };
      } else if (!selectedDraft) {
        return { message: "Error when deleting draft, No draft found" };
      }
    }),
});
