/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Permission } from "../components/permission/entity";
import { User } from "../components/user/entity";
import { AppDataSource } from "../database/dataSource";

const permissionRepository: Repository<Permission> = AppDataSource.getRepository(Permission);


interface IRequestWithUser extends Request {
  user: User
}

class Helper {
  constructor() {}

  checkPermission(roleId: number, permName: string) {
    return new Promise(
      (resolve, reject) => {
        permissionRepository
          .findOne({
            relations: {
              roles: true,
            },
            where: {
              name: permName
            }
          })
          .then((permission) => {
            const rolePermission = permission?.roles.find(role => role.id === roleId);

            if(rolePermission) {
              resolve(rolePermission);
            } else {
              reject({message: 'Forbidden'});
            }
          }).catch(() => {
              reject({message: 'Forbidden'});
          });
      }
    );
  }

  checkPermissionWithCb(permName: string, cb: any) {
    return (req: Request, res: Response) => {
      const roleId: number = (req as IRequestWithUser).user?.role?.id;

      this.checkPermission(roleId, permName)
        .then(() => {
          cb(req, res);
        })
        .catch((error) => {
          res.status(403).send(error);
        })
    }
  }
}

export default Helper;