import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Permission } from "../permission/entity"
import { User } from "../user/entity"

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    descipriton: string

    @OneToMany(() => User, (user) => user.role)
    users: User[]

    @ManyToMany(() => Permission)
    @JoinTable()
    permissions: Permission[]
}