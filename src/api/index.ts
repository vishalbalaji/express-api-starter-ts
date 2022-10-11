import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';

import trpc from './trpc';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/emojis', emojis);

router.use('/trpc', trpc);

export default router;
