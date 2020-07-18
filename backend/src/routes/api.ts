/* 🚥🚥 /api 🚥🚥 */
import express from "express";
import { createAccessToken, decodeJWTAndGetUser, setTokenInCookie } from "@/utils/authorization";

const apiRouter = express.Router();

apiRouter.route("/refresh-token")
  .get(async (req, res) => {
    try {
      const refreshToken = req.cookies["refresh-token"];
      if (typeof refreshToken !== "string") {
        return res.json({ ok: false, accessToken: "" });
      }
      const user = await decodeJWTAndGetUser(req.cookies);
      const accessToken = createAccessToken({ id: user._id });
      setTokenInCookie(res, accessToken, "all");
      return res.json({ ok: true, accessToken });
    } catch (error) {
      console.error(error);
      return res.json({ ok: false, accessToken: "" });
    }
  });

export default apiRouter;
