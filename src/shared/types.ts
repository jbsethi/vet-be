import { Request } from "express";
import { User } from "../components/user/entity";

export interface IRequestWithUser extends Request {
  user: User
}