/* 🚥🚥 /api 🚥🚥 */
import express from "express";
import { AuthShape } from "@/Interfaces";
import { createAccessToken, decodeJWTAndGetUser, setRefreshTokenInCookie, createRefreshToken } from "@/utils/authorization";

const apiRouter = express.Router();

apiRouter.route("/refresh-token")
  .post(async (req, res) => {
    try {
      const cookies = req.cookies as AuthShape;
      if (!cookies["refresh-token"]) {
        return res.json({ ok: false, authToken: "" });
      }
      const { user, token } = await decodeJWTAndGetUser({ "refresh-token": cookies["refresh-token"] }, { gqlType: false });

      if (
        /* being extra cautious to compare only number */
        typeof user._tokenVersion === "number"
        && typeof token.tokenVersion === "number"
        && user._tokenVersion !== token.tokenVersion
      ) {
        return res.json({ ok: false, accessToken: "" });
      }

      const refreshToken = createRefreshToken({ id: user._id, tokenVersion: user._tokenVersion || 0 });
      setRefreshTokenInCookie(res, refreshToken);
      const accessToken = createAccessToken({ id: user._id });

      return res.json({ ok: true, accessToken });
    } catch (error) {
      console.error(error);
      return res.json({ ok: false, accessToken: "" });
    }
  });

export default apiRouter;
