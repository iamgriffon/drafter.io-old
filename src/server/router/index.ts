import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  hello: procedure.input(
     z.object({
      msg: z.string()
    })
  )
  .query(async({input}) => {
    if(input.msg.length > 0){
      return {
        data: `Hello ${input}`
      }
    } else {
      return 'Hello from tRPC'
    }
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;
