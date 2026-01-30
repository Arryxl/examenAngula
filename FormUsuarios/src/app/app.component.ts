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
  usuarioSeleccionado: Usuario | null = null;
  modoEdicion: boolean = false;

  cargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        console.log(data);
        this.usuarios = data;
      },
      error: (err) => console.error(err)
    });
  }

  tipoDocumento: string = '';
  numeroDocumento: any = '';
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: any = '';

  validarFormulario(): boolean {

    if (this.tipoDocumento === '' || this.tipoDocumento === null) {
      alert('seleccione un tipo de documento');
      return false;
    }
    const numDocString = String(this.numeroDocumento).trim();
    if (numDocString === '' || numDocString === 'null' || numDocString === 'undefined') {
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
    if (telefonoString === '' || telefonoString === 'null' || telefonoString === 'undefined') {
      alert('ingrese un teléfono válido');
      return false;
    }
    
    return true;
  }

  enviarDatos() {
    if (!this.validarFormulario()) {
      return;
    }

    const nuevoUsuario: Usuario = {
      tipoDocumento: this.tipoDocumento,
      numeroDocumento: String(this.numeroDocumento),
      nombre: this.nombre,
      apellido: this.apellido,
      direccion: this.direccion,
      telefono: String(this.telefono)
    };

    this.usuariosService.createUsuario(nuevoUsuario).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.borrarDatos();
      },
      error: (err) => console.error(err)
    });
  }

  borrarDatos() {
    this.tipoDocumento = '';
    this.numeroDocumento = '';
    this.nombre = '';
    this.apellido = '';
    this.direccion = '';
    this.telefono = '';
  }

  abrirModalEditar(usuario: Usuario) {
    this.usuarioSeleccionado = { ...usuario };
  }

  guardarEdicion() {
    if (!this.usuarioSeleccionado || !this.usuarioSeleccionado.id) return;

    this.usuariosService.updateUsuario(this.usuarioSeleccionado.id, this.usuarioSeleccionado).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cerrarModal('editarModal');
      },
      error: (err) => console.error(err)
    });
  }

  abrirModalEliminar(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
  }

  confirmarEliminacion() {
    if (!this.usuarioSeleccionado || !this.usuarioSeleccionado.id) return;

    this.usuariosService.deleteUsuario(this.usuarioSeleccionado.id).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cerrarModal('eliminarModal');
      },
      error: (err) => console.error(err)
    });
  }

  cerrarModal(modalId: string) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  constructor(private usuariosService: UsuariosService) {}
}