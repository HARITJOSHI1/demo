import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = async ({
  req,
  resHeaders,
}: FetchCreateContextFnOptions): Promise<{
  isAuth: boolean;
  req?: Request;
}> => {
  const isAuth = false;

  return {
    isAuth,
    req,
  };
};

const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const {
  router: createTRPCRouter,
  createCallerFactory,
  mergeRouters,
} = t;
export const publicProcedure = t.procedure;
