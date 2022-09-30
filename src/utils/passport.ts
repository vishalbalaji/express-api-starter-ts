import { Passport } from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';

const passport = new Passport();

// Fake DB.
// Important: Not to be used production. Or even development, for that matter.
// Replace with your own DB.
const db = [
  { id: 1, name: 'abed', password: bcrypt.hashSync('cougartown', 6) },
  { id: 2, name: 'britta', password: bcrypt.hashSync('britta', 6) },
];

// This redecleration of the Express.User global type is needed for proper
// typing of user in serializeUser down below.
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
  usernameField: 'name',
}, async (name, password, next) => {

  let user;

  try {
    [user] = db.filter((item) => item.name === name);

    if (!user) return next(null, { id: null })
  } catch (error) {
    return next(error);
  }

  if (user && await bcrypt.compare(password, user.password)) {
    return next(null, user);
  }

  return next(null, false);
}
));

passport.serializeUser((user, next) => next(null, user.id));
passport.deserializeUser((user_id: Number, next) => next(null, db.filter((item) => item.id === user_id)[0]));

export default passport;
