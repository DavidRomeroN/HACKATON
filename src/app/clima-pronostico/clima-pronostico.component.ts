import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clima-pronostico',
  templateUrl: './clima-pronostico.component.html',
  styleUrls: ['./clima-pronostico.component.css']
})
export class ClimaPronosticoComponent implements OnInit {
  productos: any[] = [];
  climaPredicho = '';
  estaLogueado = false;

  constructor(private productoService: ProductoService, private http: HttpClient) {}

  ngOnInit(): void {
    const usuarioData = localStorage.getItem('usuario');
    if (!usuarioData) {
      this.estaLogueado = false;
      return;
    }

    this.estaLogueado = true;
    const usuario = JSON.parse(usuarioData);
    const genero = usuario.genero || 'unisex';

    // ✅ Usa ubicación en tiempo real (si existe)
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        this.obtenerClimaYProductos(lat, lon, genero);
      },
      err => {
        console.warn('Ubicación no permitida, usando la guardada.');
        const lat = usuario.latitud || -15.5;
        const lon = usuario.longitud || -70.1;
        this.obtenerClimaYProductos(lat, lon, genero);
      }
    );
  }

  obtenerClimaYProductos(lat: number, lon: number, genero: string): void {
    this.http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .subscribe({
        next: res => {
          const temp = res.current_weather.temperature;
          this.climaPredicho = temp < 18 ? 'frio' : 'calor';

          this.productoService.obtenerRecomendados(genero, this.climaPredicho).subscribe({
            next: res => this.productos = res,
            error: err => console.error('❌ Error productos:', err)
          });
        },
        error: err => {
          console.error('❌ Error clima:', err);
          this.climaPredicho = 'frio'; // Fallback
        }
      });
  }
}
