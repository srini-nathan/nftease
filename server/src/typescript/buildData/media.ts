import { Types } from "mongoose";
import { FileBuildData } from "./file";

export interface MediaBuildData {
  title: string;
  description?: string;
  userId: Types.ObjectId;
  token: FileBuildData;
  preview: FileBuildData;
}
