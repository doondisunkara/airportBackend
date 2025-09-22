import {Entity, Column, PrimaryColumn, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import {Airport} from "./Airport";
import {Country} from "./Country";

@Entity()
export class City{
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    is_active: boolean

    @Column({type: "real"})
    lat: number

    @Column({type: "real"})
    long: number

    @ManyToOne(type => Country, country => country.cities, {nullable: true, onDelete: "SET NULL"})
    @JoinColumn({name: "country_id"})
    country: Country

    @Column({nullable: true})
    country_id: number

    @OneToMany(()=> Airport, airport => airport.city)
    airports: Airport[]
}