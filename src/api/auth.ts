import express from 'express';

import passport from '@/utils/passport';

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      res.status(401);
      return next(new Error('Incorrect password'))
    }

    req.login(user, (loginErr) => {
      if (!user.id) {
        res.status(404);
        return next(new Error('User not found'))
      }

      if (loginErr) {
        return next(loginErr);
      }

      if (req.user) {
        return res.json({ id: req.user.id, name: req.user.name });
      }
    });
  })(req, res, next);
});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    return res.json({ message: 'logged out' });
  });
});

export default router;
