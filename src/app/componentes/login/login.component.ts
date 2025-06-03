import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  correo = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  login(): void {
    this.usuarioService.login(this.correo).subscribe({
      next: (res: any) => {
        alert('Bienvenido ' + res.nombre);

        // Obtener ubicación antes de guardar el usuario
        navigator.geolocation.getCurrentPosition(
          pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            // Añadir coordenadas al objeto usuario
            res.latitud = lat;
            res.longitud = lon;

            localStorage.setItem('usuario', JSON.stringify(res));
            this.router.navigate(['/']);
          },
          err => {
            console.warn('⚠️ No se pudo obtener la ubicación:', err.message);
            // Si no se permite la ubicación, se guarda sin coordenadas
            localStorage.setItem('usuario', JSON.stringify(res));
            this.router.navigate(['/']);
          }
        );
      },
      error: err => {
        alert('Usuario no encontrado');
      }
    });
  }
}
