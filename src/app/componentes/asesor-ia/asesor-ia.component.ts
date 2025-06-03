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
  recomendacion: string = '';
  genero: string = '';
  clima: string = '';
  temperatura: number = 0;
  cargando: boolean = true;

  constructor(
    private http: HttpClient,
    private productoService: ProductoService,
    private iaService: IAService
  ) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.genero = usuario.genero || 'unisex';
    const nombre = usuario.nombre || 'usuario';

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

            this.productoService.obtenerRecomendados(this.genero, this.clima).subscribe({
              next: productos => {
                if (productos.length === 0) {
                  this.recomendacion = 'No hay productos recomendados disponibles para este clima.';
                  this.cargando = false;
                  return;
                }

                const producto = productos[Math.floor(Math.random() * productos.length)];
                const prompt = `Hola IA, el usuario ${nombre} está en un lugar con clima ${this.clima} (${this.temperatura}°C), busca una recomendación andina de ropa de género ${this.genero}, basada en este producto: ${producto.nombre}, de categoría ${producto.categoria}, material ${producto.material}. Sé breve, cálido y claro.`;

                this.iaService.obtenerRecomendacion(prompt).subscribe({
                  next: respuesta => {
                    const mensajeIA = respuesta.choices?.[0]?.message?.content;
                    this.recomendacion = mensajeIA || 'La IA no devolvió una recomendación válida.';
                    this.cargando = false;
                  },
                  error: err => {
                    console.error('Error al obtener recomendación IA:', err);
                    this.recomendacion = 'Error al generar recomendación.';
                    this.cargando = false;
                  }
                });
              },
              error: err => {
                console.error('Error al obtener productos:', err);
                this.recomendacion = 'No se pudieron obtener productos.';
                this.cargando = false;
              }
            });
          },
          error: err => {
            console.error('Error al obtener el clima:', err);
            this.recomendacion = 'No se pudo obtener el clima actual.';
            this.cargando = false;
          }
        });
      },
      err => {
        console.warn('Error al obtener ubicación:', err.message);
        this.recomendacion = 'Lo sentimos, no pudimos obtener tu ubicación.';
        this.cargando = false;
      }
    );
  }
}
