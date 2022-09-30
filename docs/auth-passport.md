# Passport Authentication Configuration

This branch is configured with [Passport](https://www.npmjs.com/package/passport) for authentication.

A passport client is configured in and exported from [src/utils/passport.ts](../src/utils/passport.ts). This client is configured with a simple `local` strategy(username-password auth) as per the docs from [passport-local](https://www.npmjs.com/package/passport-local) and [passport-api-docs](https://github.com/jwalton/passport-api-docs).

For the sake of mergability of the branches in this repo, the passport client is configured to read from a fake, in-memory database to simulate the fetching of data from a DB. As mentioned in the file, you would want to replace it with your own database connector, as well as wherever it is mentioned in the file.

A simple `/auth` route in the [src/api/auth.ts](../src/api/auth.ts) file. This `/auth` route currently has 2 endpoints: `/login` and `/logout` to perform their respective action.

Finally, the `/emojis` route in the base API is now locked for unauthorized, just as an example, using a custom middleware called `isAuthenticated`, defined in the [src/middlewares.ts](../src/middlewares.ts). This middleware is just used to check whether `req.user` exists and call the `next` function with the appropriate error and status code if it doesn't.

For more information on passport and its various strategies, refer to these following docs:
* [passport-api-docs](https://github.com/jwalton/passport-api-docs)
* [Official Passport.js docs](https://www.passportjs.org/docs/) 
