import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private usuariosRepository: Repository<Usuario>,
    ) {}

    async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        const usuario = this.usuariosRepository.create(createUsuarioDto);
        return await this.usuariosRepository.save(usuario);
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuariosRepository.find();
    }

    async findOne(id: number): Promise<Usuario> {
        const usuario = await this.usuariosRepository.findOneBy({ id });
        if (!usuario) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return usuario;
    }

    async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
        await this.findOne(id);
        await this.usuariosRepository.update(id, updateUsuarioDto);
        return await this.findOne(id);
    }

    async remove(id: number): Promise<Usuario> {
        const usuario = await this.findOne(id);
        usuario.activo = false;
        return await this.usuariosRepository.save(usuario);
    }
}