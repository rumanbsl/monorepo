import express from "express";
import hello from "@/src/tst";

const app = express();

app.get("/", (req, res) => { res.json({ it: "works" }) })

app.listen(3000, () => { console.log(`${hello} on 3000`) })
