import { FileUpload } from "graphql-upload";
import concat from "concat-stream";

export default (file: FileUpload) => {
  console.log("getBuffer", file);
  const stream = file.createReadStream();
  return new Promise<Buffer>((resolve, reject) => {
    const concatStream = concat((buffer) => resolve(buffer));
    stream.on("error", (error) => reject(error));
    stream.pipe(concatStream);
  });
};
