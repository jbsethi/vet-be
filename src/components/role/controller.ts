import { Request, Response } from "express";
import { Repository } from "typeorm";

import { AppDataSource } from "../../database/dataSource";
import { Role } from "../role/entity";

export const getAllRoles = async (req: Request, res: Response) => {
  const take = Number(req.params.limit || 10);
  const skip = Number(req.params.skip || 0);
  
  const roleRepository: Repository<Role> = AppDataSource.getRepository(Role);

  const roles: Role[] = await roleRepository.find({
      take,
      skip,
      relations: {
        permissions: true,
      }
    });

  return res.status(200).send({ roles });
};
