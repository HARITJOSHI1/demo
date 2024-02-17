import { createTRPCRouter, mergeRouters, publicProcedure} from "@/server/init";
import StarwarsRouter from "./routers/starwars";

export const appRouter = mergeRouters(StarwarsRouter)
export type AppRouter = typeof appRouter;
