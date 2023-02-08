/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { Permission } from "../components/permission/entity";
import { Role } from "../components/role/entity";
import { AppDataSource } from "../database/dataSource";
import { IRequestWithUser } from "./types";

const roleRepository: Repository<Role> = AppDataSource.getRepository(Role);

class Helper {
  constructor() {}

  checkPermission(roleId: number, permName: string) {
    return new Promise(
      (resolve, reject) => {
        roleRepository
          .findOneOrFail({
            relations: {
              permissions: true
            },
            where: {
              id: roleId
            }
          })
          .then((role) => {
            const permission: Permission | undefined = role.permissions?.find((permission: Permission) => permission.name === permName);

            if(permission) {
              resolve(permission);
            } else {
              reject({message: 'Forbidden'});
            }
          }).catch(() => {
              reject({message: 'Forbidden'});
          });
      }
    );
  }

  checkPermissionWithCb(permName: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      const roleId: number = (req as IRequestWithUser).user?.role?.id;

      this.checkPermission(roleId, permName)
        .then(() => {
          next();
        })
        .catch((error) => {
          res.status(403).send(error);
        })
    }
  }

  catchAsync(fn: any) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next))
        .catch((error) => next(error))
    }
  }
}

export default Helper;