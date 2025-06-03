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
        // Guardar en localStorage si quieres
        localStorage.setItem('usuario', JSON.stringify(res));
        // Redireccionar
        this.router.navigate(['/']);
      },
      error: err => {
        alert('Usuario no encontrado');
      }
    });
  }


}
