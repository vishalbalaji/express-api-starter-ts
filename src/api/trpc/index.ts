import { initTRPC } from '@trpc/server';

const t = initTRPC.create();
const appRouter =
  t.router({
    hello: t.procedure
      .query((req) => {
        return { message: 'Hi there!' };
      }),
  })

export type AppRouter = typeof appRouter;
export default appRouter;
