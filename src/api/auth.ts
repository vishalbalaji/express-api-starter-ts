import express from 'express';

import passport from '@/utils/passport';

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err); // will generate a 500 error
    }

    if (!user) {
      res.status(401);
      return next(new Error('Incorrect username or password'))
    }

    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.json({ user_id: req.user?.id, name: req.user?.name });
    });
  })(req, res, next);
});

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    return res.json({ message: 'logged out' });
  });
});

export default router;
