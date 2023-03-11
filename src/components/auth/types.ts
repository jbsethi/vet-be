import { Request } from "express";
import { User } from "../user/entity";

export interface authJwtData {
  id: number;
  email: string;
  roleId: number;
}