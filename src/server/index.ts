import { createTRPCRouter, mergeRouters, publicProcedure} from "@/server/init";
import TodoRouter from "./routers/todo";

export const appRouter = mergeRouters(TodoRouter)
export type AppRouter = typeof appRouter;
