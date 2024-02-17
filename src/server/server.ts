import { appRouter } from ".";
import { createCallerFactory } from "./init";

const createCaller = createCallerFactory(appRouter);

export const api = createCaller({
    isAuth: false
})