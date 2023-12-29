import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class confSerial {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    serial: string
    @Column()
    sign:string

    @Column()
    bed: string

}
