import { Request, Response } from "express";
import { Repository } from "typeorm";
import Joi from 'joi';
import bcrypt from 'bcryptjs';

import { AppDataSource } from "../../database/dataSource";
import { Permission } from "./entity";

export const getAllPermissions = async (req: Request, res: Response) => {
  const take = Number(req.params.limit || 10);
  const skip = Number(req.params.skip || 0);
  
  const permissionRepository: Repository<Permission> = AppDataSource.getRepository(Permission);

  const permissions: Permission[] = await permissionRepository.find({
      take,
      skip,
      select: ["id", "name", "descipriton"],
    });

  return res.status(200)
    .send({
      permissions
    });
};
