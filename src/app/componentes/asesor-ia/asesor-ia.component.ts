
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoService } from 'src/app/servicios/producto.service';
import { IAService } from 'src/app/servicios/ia.service';

@Component({
  selector: 'app-asesor-ia',
  templateUrl: './asesor-ia.component.html',
  styleUrls: ['./asesor-ia.component.css']
})
export class AsesorIaComponent implements OnInit {
  recomendacion = 'Cargando recomendación...';
  genero = '';
  temperatura = 0;
  clima = '';
  nombre = '';

  constructor(
    private http: HttpClient,
    private productoService: ProductoService,
    private iaService: IAService
  ) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.genero = usuario.genero || 'unisex';
    this.nombre = usuario.nombre || 'el usuario';

    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        this.http.get<any>(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        ).subscribe({
          next: res => {
            this.temperatura = res.current_weather.temperature;
            this.clima = this.temperatura < 18 ? 'frio' : 'calor';
            this.obtenerRecomendacionIA();
          },
          error: err => {
            console.error('Error al obtener el clima:', err);
            this.recomendacion = 'No se pudo obtener el clima actual.';
          }
        });
      },
      err => {
        console.warn('Error al obtener ubicación:', err.message);
        this.recomendacion = 'Lo sentimos, no pudimos obtener tu ubicación para hacer una recomendación.';
      }
    );
  }

  obtenerRecomendacionIA(): void {
    this.productoService.obtenerRecomendados(this.genero, this.clima).subscribe({
      next: productos => {
        if (productos.length === 0) {
          this.recomendacion = 'No hay productos recomendados para este clima y género.';
          return;
        }

        const producto = productos[Math.floor(Math.random() * productos.length)];

        const prompt = `Hola, eres un asesor de moda andina. La temperatura actual es de ${this.temperatura}°C, el clima es ${this.clima}, y la recomendación es para ${this.nombre}, que es de género ${this.genero}.
Debes recomendar el siguiente producto disponible: ${producto.nombre}, categoría ${producto.categoria}, material ${producto.material}.
Explica en 5 o 8 líneas por qué este producto es ideal según el clima y género del usuario. Sé amable y directo.`;

        this.iaService.obtenerRecomendacion(prompt).subscribe({
          next: (res: any) => {
            this.recomendacion = res.choices[0]?.message?.content || 'No se recibió respuesta.';
          },
          error: err => {
            console.error('Error IA:', err);
            this.recomendacion = 'No se pudo obtener una recomendación inteligente en este momento.';
          }
        });
      },
      error: err => {
        console.error('Error al obtener productos:', err);
        this.recomendacion = 'No se pudo obtener una recomendación en este momento.';
      }
    });
  }
}
