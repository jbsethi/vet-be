import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Role } from "../role/entity"

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    descipriton: string

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]
}