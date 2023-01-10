import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Role } from "../role/entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    isActive: boolean

    @ManyToOne(() => Role, (role) => role.users)
    role: Role
}