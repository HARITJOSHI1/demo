import { createTRPCRouter, publicProcedure } from "../init";

const TodoRouter = createTRPCRouter({
  todos: publicProcedure.query((opts) => "Here are all of your todos"),
});

export default TodoRouter;
