import {Entity, Column, PrimaryColumn, OneToMany} from "typeorm";
import {City} from "./City";

@Entity()
export class Country {
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column({length: 2, unique: true})
    country_code_two: string

    @Column({length: 3, unique: true})
    country_code_three: string

    @Column()
    mobile_code: number

    @Column()
    continent_id: number

    @OneToMany(type => City, city => city.country) cities: City[]
}