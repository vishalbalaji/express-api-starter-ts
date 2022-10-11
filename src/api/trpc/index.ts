import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

const t = initTRPC.create();

const hello =
  t.procedure
    .query(
      () => {
        return { message: 'Hi there!' };
      }
    );

const endpoints = {
  hello,
};

const appRouter = t.router(endpoints);

export type AppRouter = typeof appRouter;

export default trpcExpress.createExpressMiddleware({ router: appRouter });
