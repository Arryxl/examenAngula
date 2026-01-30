import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
    private usuarios: Usuario[] = [];
    private idCounter = 1;

    create(createUsuarioDto: CreateUsuarioDto): Usuario {
    const nuevoUsuario: Usuario = {
        id: this.idCounter++,
        ...createUsuarioDto,
        fechaRegistro: new Date(),
    };
    this.usuarios.push(nuevoUsuario);
    return nuevoUsuario;
    }

    findAll(): Usuario[] {
    return this.usuarios;
    }

    findOne(id: number): Usuario {
    const usuario = this.usuarios.find(usr => usr.id === id);
    if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
    }

    update(id: number, updateUsuarioDto: UpdateUsuarioDto): Usuario {
    const usuario = this.findOne(id);
    const index = this.usuarios.indexOf(usuario);
    
    const usuarioActualizado = {
        ...usuario,
        ...updateUsuarioDto,
    };
    
    this.usuarios[index] = usuarioActualizado;
    return usuarioActualizado;
    }

    remove(id: number): void {
    const usuario = this.findOne(id);
    const index = this.usuarios.indexOf(usuario);
    this.usuarios.splice(index, 1);
    }
}