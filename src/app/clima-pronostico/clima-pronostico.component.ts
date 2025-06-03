import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-clima-pronostico',
  templateUrl: './clima-pronostico.component.html',
  styleUrls: ['./clima-pronostico.component.css']
})
export class ClimaPronosticoComponent implements OnInit {
  productos: any[] = [];
  climaPredicho = 'frio';
  estaLogueado = false;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    const usuarioData = localStorage.getItem('usuario');

    if (!usuarioData) {
      this.estaLogueado = false;
      return;
    }

    this.estaLogueado = true;
    const usuario = JSON.parse(usuarioData);
    const genero = usuario.genero || 'unisex';

    this.productoService.obtenerRecomendados(genero, this.climaPredicho).subscribe({
      next: res => this.productos = res,
      error: err => console.error(err)
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    window.location.reload();
  }
}
