import { Request, Response } from "express";

export const getAllUsers = (req: Request, res: Response) => {
  res.send({
    worked: 'worked'
  })
};

export const registerNewUser = (req: Request, res: Response) => {
  res.send({
    worked: 'worked'
  })
}