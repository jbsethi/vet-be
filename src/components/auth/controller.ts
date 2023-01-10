/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { AppDataSource } from "../../database/dataSource";
import { User } from "../user/entity";

export const login = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password
        } = req.body;

        // TODO: Add validations
        const user: User | null = await AppDataSource
            .getRepository(User)
            .findOneBy({ email })

        if (!user) {
            return res.status(404).send("Email or Passowrd is incorrect !");
        }

        res.status(200).send(user)
    }
    catch (error) {
        res.status(400).send(error)
    }

};

export const me = (req: Request, res: Response) => {
    res.send({
        worked: 'worked'
    })
};