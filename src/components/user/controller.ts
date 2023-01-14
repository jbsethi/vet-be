import { Request, Response } from "express";
import { Repository } from "typeorm";

import { AppDataSource } from "../../database/dataSource";
import { Role } from "../role/entity";
import { User } from "./entity";
import { IRegisterUserDto } from "./types";

export const getAllUsers = (req: Request, res: Response) => {
  const take = Number(req.params.limit || 10);
  const skip = Number(req.params.skip || 0);
  
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  userRepository.find({
    take,
    skip,
    select: ["id", "email", "firstName", "lastName", "isActive"],
  }).then((users: User[]) => {
    
    res.status(200).send({ users: users.filter(user => user.role.name !== 'super') });
  }).catch(error => {
    res.status(400).send(error);
  })
};

export const registerNewUser = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      roleId,
    }: IRegisterUserDto = req.body;
  
    const role: Role = await AppDataSource.getRepository(Role)
      .findOneOrFail({
        where: {
          id: Number(roleId)
        }
      });

    if (!role) {
      return res.status(404).send('Role doesn\'t exist');
    }

    const newUser: User = new User();
    
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;

    newUser.role = role;

    const resultData: User = await AppDataSource.getRepository(User).save(newUser);

    if (!resultData) {
      throw new Error('Error Saving');
    }

    return res.status(201).send({
      user: resultData
    })
  } catch(error) {
    res.status(400).send(error);
  }
}