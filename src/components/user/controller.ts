import { Request, Response } from "express";
import { Repository } from "typeorm";
import Joi from 'joi';
import bcrypt from 'bcryptjs';

import { AppDataSource } from "../../database/dataSource";
import { Role } from "../role/entity";
import { User } from "./entity";
import { IRegisterUserDto } from "./types";

export const getAllUsers = async (req: Request, res: Response) => {
  const take = Number(req.params.limit || 10);
  const skip = Number(req.params.skip || 0);
  
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users: User[] = await userRepository.find({
      take,
      skip,
      select: ["id", "email", "firstName", "lastName", "isActive"],
      relations: {
        role: true,
      }
    });

  return res.status(200).send({ users: users.filter((user: User) => user.role.name !== 'super') });
};

export const registerNewUser = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    roleId,
  }: IRegisterUserDto = req.body;

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    roleId: Joi.string().required(),
  });

  const { error } = schema.validate({
    firstName,
    lastName,
    email,
    password,
    roleId,
  });

  if (error) return res.status(422).send(error);

  const role: Role | null = await AppDataSource.getRepository(Role)
      .findOne({
        where: {
          id: Number(roleId),
        },
      });

  if (!role) {
    return res.status(404).send('Role doesn\'t exist');
  }

  const newUser: User = new User();
    
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email;
  newUser.hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  newUser.role = role;

  const resultData: User = await AppDataSource.getRepository(User).save(newUser);

  if (!resultData) {
    throw new Error('Something went wrong !');
  }

  return res.status(201).send({
    user: resultData,
  });
}