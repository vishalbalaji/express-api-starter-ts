import { Passport } from 'passport';
import passportLocal from 'passport-local';

const passport = new Passport();

// Fake DB
const db = [{ id: 1, name: 'user', password: 'supersecret' }];

// This redecleration of the Express.User global type is needed for proper
// typing of user in deserializeUser.
// Be sure to extend your own User type from either you DB or own definition.
declare global {
  namespace Express {
    interface User {
      id: Number
      name: String
      password: String
    }
  }
};

passport.use(new passportLocal.Strategy({
  usernameField: 'name'
}, (name, password, next) => {

  const [user] = db.filter((user) => user.name === name);
  if (user && user.password === password) {
    next(null, user);
  } else {
    next(null, false);
  }
}
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((user_id: Number, done) => done(null, db.filter((item) => item.id === user_id)[0]));

export default passport;
