import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";
import {City} from "./City";

@Entity()
export class Airport{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    icao_code: string

    @Column()
    iata_code: string

    @Column({type: "varchar", length: 500})
    name: string

    @Column()
    type: string

    @Column({type: "real"})
    latitude_deg: number

    @Column({type: "real"})
    longitude_deg: number

    @Column()
    elevation_ft: number

    @ManyToOne(() => City, city => city.airports, {nullable: true, onDelete: "SET NULL"})
    @JoinColumn({name: "city_id"})
    city: City

    @Column({nullable: true})
    city_id: number

}