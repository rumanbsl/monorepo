/* 🚥🚥 /api 🚥🚥 */
import express from "express";
import { AuthCookiesResponse } from "@/Interfaces";
import { createAccessToken, decodeJWTAndGetUser, setTokenInCookie, createRefreshToken } from "@/utils/authorization";

const apiRouter = express.Router();

apiRouter.route("/refresh-token")
  .post(async (req, res) => {
    try {
      const cookies = req.cookies as AuthCookiesResponse;
      if (!cookies["refresh-token"]) {
        return res.json({ ok: false, authToken: "" });
      }
      const user = await decodeJWTAndGetUser(cookies);
      // creating new refresh token as well
      setTokenInCookie(res, createRefreshToken({ id: user._id }), "refresh-token");
      const accessToken = createAccessToken({ id: user._id });
      return res.json({ ok: true, accessToken });
    } catch (error) {
      console.error(error);
      return res.json({ ok: false, accessToken: "" });
    }
  });

export default apiRouter;
