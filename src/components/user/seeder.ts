/* eslint-disable @typescript-eslint/no-explicit-any */
import { Seeder } from 'typeorm-extension';
import { DataSource, InsertResult } from 'typeorm';

import { Role } from '../role/entity'
import { User } from './entity';
import { Permission } from '../permission/entity';

const permissions: string[] = [
    'user_add',
    'user_get',
];

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
    ): Promise<any> {
        await dataSource
            .getRepository(Permission)
            .insert(
                permissions
                    .map(
                        permName => ({
                            name: permName,
                            descipriton: `${permName}: For accessing`,
                        })
                    )
            )

        const allPermissions = await dataSource.getRepository(Permission).find({});

        const role: Role = new Role();

        role.name = 'super';
        role.descipriton =  'The default super role with all access from start';
        role.permissions = allPermissions;

        const insertedRole = await dataSource.getRepository(Role).save(role);

        const user = new User();

        user.firstName = 'super';
        user.lastName = 'admin';
        user.email = 'super.admin@vetbe.com';
        user.isActive = true;
        user.role = insertedRole;

        await dataSource.getRepository(User).save(user)
    }
}