/* eslint-disable @typescript-eslint/no-empty-function */
import { Repository } from "typeorm";
import { Permission } from "../components/permission/entity";
import { AppDataSource } from "../database/dataSource";

const permissionRepository: Repository<Permission> = AppDataSource.getRepository(Permission);

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
}

export default Helper;