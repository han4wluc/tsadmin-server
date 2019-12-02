import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
    constructor(params) {
        if (params) {
            Object.keys(params).forEach((key) => {
                const value = params[key]
                this[key] = value
            })
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

}
