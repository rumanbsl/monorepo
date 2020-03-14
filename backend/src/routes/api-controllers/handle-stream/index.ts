import { Irequest, Iresponse } from "@/Interfaces";
import { resolve } from "path";
import { createReadStream, createWriteStream } from "fs";
import { Transform } from "stream";

/**
 * @description
 * @param {Request} req
 * @param {Response} res
 */
async function handleStream(_: Irequest, res: Iresponse) {
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
