import { resolve } from "path";
import { createReadStream, createWriteStream } from "fs";
import { Transform } from "stream";
import { Request, Response } from "express";

/**
 * @description
 * @param {Request} req
 * @param {Response} res
 */
async function handleStream(_: Request, res: Response) {
  const processStream = new Transform({
    transform(chunk: Int32Array, __, cb) {
      this.push(chunk.toString().toLowerCase());
      cb();
    },
  });

  const writeToFile = createWriteStream(resolve(__dirname, "write.txt"));

  const writeFileStream = createReadStream(resolve(__dirname, "read.txt"))
    .pipe(processStream)
    .pipe(writeToFile);
  writeFileStream.on("close", () => {
    res.json({ ok: "oks" });
  });
}

export default handleStream;
