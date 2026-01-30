import { Component } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FormUsuarios';
  
  usuarios: Usuario[] = [];

  cargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        console.log('✅ Usuarios cargados:', data);
        this.usuarios = data;
      },
      error: (err) => console.error('❌ Error al cargar usuarios:', err)
    });
  }

  tipoDocumento: string = '';
  numeroDocumento: string = '';
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';

  validarFormulario(): boolean {

    if (this.tipoDocumento === '' || this.tipoDocumento === null) {
      alert('seleccione un tipo de documento');
      return false;
    }
    const numDocString = String(this.numeroDocumento).trim();
    if (numDocString === '' || numDocString.includes(' ')) {
      alert('ingrese un número de documento válido');
      return false;
    }
    
    if (this.nombre === '' || this.nombre.trim() === '') {
      alert('ingrese el nombre');
      return false;
    }
    if (this.apellido === '' || this.apellido.trim() === '') {
      alert('ingrese el apellido');
      return false;
    }
    if (this.direccion === '' || this.direccion.trim() === '') {
      alert('ingrese la dirección');
      return false;
    }
    const telefonoString = String(this.telefono).trim();
    if (telefonoString === '' || telefonoString.includes(' ')) {
      alert('ingrese un teléfono válido');
      return false;
    }
    
    return true;
  }

  enviarDatos() {
    if (!this.validarFormulario()) {
      return;
    }
    
    this.borrarDatos();
  }

  borrarDatos() {
    this.tipoDocumento = '';
    this.numeroDocumento = '';
    this.nombre = '';
    this.apellido = '';
    this.direccion = '';
    this.telefono = '';
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  constructor(private usuariosService: UsuariosService) {}
}
