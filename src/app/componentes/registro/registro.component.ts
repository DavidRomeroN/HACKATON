import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  usuario = {
    nombre: '',
    correo: '',
    latitud: 0,
    longitud: 0,
    estiloPreferido: '',
    genero: ''
  };

  constructor(private usuarioService: UsuarioService) {}

  registrar(): void {
    this.usuarioService.registrarUsuario(this.usuario).subscribe({
      next: res => {
        console.log('Registrado:', res);
        alert('¡Usuario registrado con éxito!');
      },
      error: err => {
        console.error('Error al registrar:', err);
        alert('Error al registrar');
      }
    });
  }

}
