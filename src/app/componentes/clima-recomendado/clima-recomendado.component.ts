import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clima-recomendado',
  templateUrl: './clima-recomendado.component.html',
  styleUrls: ['./clima-recomendado.component.css']
})
export class ClimaRecomendadoComponent implements OnInit {

  productos: any[] = [];
  genero = '';
  clima = '';
  temperatura = 0;

  // ✅ Propiedades agregadas para evitar errores en el HTML
  usuarioLogueado = false;
  recomendacion: any[] = [];

  constructor(private productoService: ProductoService, private http: HttpClient) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    // ✅ Se asume logueado si hay nombre
    this.usuarioLogueado = !!usuario?.nombre;

    this.genero = usuario.genero || 'unisex';

    const lat = usuario.latitud || -15.5;
    const lon = usuario.longitud || -70.1;

    // ✅ Consultar clima desde Open-Meteo
    this.http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .subscribe({
        next: res => {
          this.temperatura = res.current_weather.temperature;
          this.clima = this.temperatura < 18 ? 'frio' : 'calor';

          // ✅ Traer productos recomendados desde backend
          this.productoService.obtenerRecomendados(this.genero, this.clima).subscribe({
            next: productos => this.productos = productos,
            error: err => console.error('❌ Error al traer productos:', err)
          });
        },
        error: err => console.error('❌ Error al obtener clima:', err)
      });
  }
}
