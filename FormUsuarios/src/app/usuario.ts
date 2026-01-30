export interface Usuario {
    id?: number;
    tipoDocumento: string;
    numeroDocumento: string;
    nombre: string;
    apellido: string;
    telefono?: string;
    direccion?: string;
    activo?: boolean;
    fechaRegistro?: Date;
}