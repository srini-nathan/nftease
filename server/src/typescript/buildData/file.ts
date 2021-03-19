import { MimeTypeEnum } from "@typescript/schema";

export interface FileBuildData {
  buffer: Buffer;
  filename: string;
  mimetype: string;
}
