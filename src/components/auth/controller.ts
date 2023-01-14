/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AppDataSource } from "../../database/dataSource";
import { User } from "../user/entity";
import logger from "../../shared/logger";
import envVars from "../../declarations/envVars";
import { authJwtData } from "./types";
import { Role } from "../role/entity";
import { IRequestWithUser } from "../../shared/types";

export const login = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password
        } = req.body;

        logger.info(`Attempt to login user with email: ${email}`);

        // TODO: Add validations
        const user: User | null = await AppDataSource
            .getRepository(User)
            .findOne({
              relations: {
                role: true
              },
              where: {
                email
              }
            })

        if (!user) {
            logger.error('User loggin failed no email found: ' + email);
            return res.status(401).send("Email or Passowrd is incorrect !");
        }

        if (!bcrypt.compareSync(password, user.hash)) {
            logger.error('User loggin failed invalid passowrd for email: ' + email);
            return res.status(401).send("Email or Password is incorrect !");
        }

        const payload: authJwtData = {
          id: user.id,
          email: user.email,
          roleId: user.role.id
        }

        const token: string = jwt.sign(
            JSON.parse(
                JSON.stringify(user)
            ),
            envVars.auth.secret,
            {
                expiresIn: envVars.auth.expiresIn
            }
        );

        res
          .status(200)
          .json({
            success: true,
            token: 'JWT ' + token
          });
    }
    catch (error) {
        res.status(400).send(error)
    }

};

export const me = async (req: Request, res: Response) => {
  try {
    const role: Role = await AppDataSource.getRepository(Role)
      .findOneOrFail({
        relations: {
          permissions: true
        },
        where: {
          id: (req as IRequestWithUser).user?.role?.id
        }
      })

    res.send({
        user: {
          ...req.user,
          role
        }
    })
  } catch (err) {
    res.status(400).send(err);
  }
};