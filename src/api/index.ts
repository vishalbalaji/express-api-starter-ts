import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import auth from './auth';
import * as middlewares from '@/middlewares'

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/auth', auth);
router.use('/emojis', middlewares.isAuthenticated, emojis);

export default router;
