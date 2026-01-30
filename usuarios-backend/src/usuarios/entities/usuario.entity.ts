import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipoDocumento: string;

    @Column()
    numeroDocumento: string;
    
    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    telefono?: string;

    @Column({ nullable: true })
    direccion?: string;

    @CreateDateColumn()
    fechaRegistro: Date;
}