import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Role } from "../role/entity"

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    descipriton: string

    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[]
}