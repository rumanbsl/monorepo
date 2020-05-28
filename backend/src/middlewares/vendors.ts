import { Express } from "express";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import { DB_URL } from "@/app";
import passport from "passport";
import models from "@/models";
import passportMiddlewares from "./passport";

passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  const matchingUser = models.User.findById(id);
  done(null, matchingUser);
});

/**
 *
 *
 * @export
 * @param {Express} app Takes an "Express" instance
 * @returns {Express} return modified Express instance containing middlewares
 */
export default function useVendorMiddlewares(app: Express): Express {
  const MongoStore = connectMongo(session);
  const store = new MongoStore({
    uri        : DB_URL,
    collection : "loggedInUserSession",
  });
  const sessionMiddleware = session({
    name              : "User session",
    secret            : process.env.SESSION_SECRET,
    cookie            : { maxAge: 2 * 60 * 60 * 1000 },
    resave            : false,
    saveUninitialized : false,
    store,
  });
  passport.use(passportMiddlewares.graphqlStrategy);

  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());
  return app;
}
