import { fetchClient } from "@/global/axiosConfig";
import { createTRPCRouter, publicProcedure } from "../init";
import { RootStarWarsData } from "./types/types";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { AxiosError } from "axios";

const StarwarsRouter = createTRPCRouter({
  starwarsPublic: publicProcedure
    .input(
      z.object({
        page: z.number().optional(),
      })
    )
    .query(async (opts) => {
      try {
        const { data } = await fetchClient<RootStarWarsData>(
          `/people?page=${opts.input.page}`
        );

        return data;
      } catch (e) {
        if (e instanceof AxiosError) {
          return new TRPCError({
            code: "NOT_FOUND",
            message: "No more data to paginate",
          });
        } else if (e instanceof TRPCError) {
          return new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Server error",
          });
        }
      }
    }),
});

export default StarwarsRouter;
