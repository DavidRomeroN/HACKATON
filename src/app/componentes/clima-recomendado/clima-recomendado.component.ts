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
  usuarioLogueado = false;
  mostrarRecomendaciones = false;
  ubicacionNoPermitida = false;


  constructor(private productoService: ProductoService, private http: HttpClient) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.usuarioLogueado = !!usuario?.nombre;
    this.genero = usuario.genero || 'unisex';

    const yaPidioUbicacion = localStorage.getItem('ubicacionSolicitada');

    if (!yaPidioUbicacion) {
      this.solicitarUbicacion();
      localStorage.setItem('ubicacionSolicitada', 'true');
    } else {
      this.mostrarRecomendaciones = true;
      const lat = usuario.latitud || -15.5;
      const lon = usuario.longitud || -70.1;
      this.obtenerClimaYProductos(lat, lon);
    }
  }


  solicitarUbicacion(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          this.obtenerClimaYProductos(lat, lon);
          this.mostrarRecomendaciones = true;
        },
        err => {
          console.warn('❌ Ubicación no permitida:', err.message);
          this.ubicacionNoPermitida = true;
        }
      );
    } else {
      this.ubicacionNoPermitida = true;
    }
  }

  obtenerClimaYProductos(lat: number, lon: number): void {
    this.http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .subscribe({
        next: res => {
          this.temperatura = res.current_weather.temperature;
          this.clima = this.temperatura < 18 ? 'frio' : 'calor';

          this.productoService.obtenerRecomendados(this.genero, this.clima).subscribe({
            next: productos => this.productos = productos,
            error: err => console.error('❌ Error productos:', err)
          });
        },
        error: err => console.error('❌ Error clima:', err)
      });
  }

}
