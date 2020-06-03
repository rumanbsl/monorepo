import { Express } from "express";
import passport from "passport";
import models from "@/models";

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
  return app;
}
