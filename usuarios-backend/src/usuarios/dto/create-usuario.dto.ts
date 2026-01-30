import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUsuarioDto {

    @IsString()
    @IsNotEmpty()
    tipoDocumento: string;

    @IsString()
    @IsNotEmpty()
    numeroDocumento: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsString()
    @IsOptional()
    direccion?: string;
}