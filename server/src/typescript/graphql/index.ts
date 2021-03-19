import { UserDocument } from "@models/User";
import { Request, Response } from "express";

export interface IContext {
  user?: UserDocument;
  req: Request;
  res: Response;
}
