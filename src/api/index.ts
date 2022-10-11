import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { inferAsyncReturnType } from '@trpc/server';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import trpcRouter from './trpc';

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);
router.use('/trpc', trpcExpress.createExpressMiddleware({ router: trpcRouter, createContext }));

export default router;
