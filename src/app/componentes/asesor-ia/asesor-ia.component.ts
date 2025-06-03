import { Component, OnInit } from '@angular/core';
import { IAService } from 'src/app/servicios/ia.service';

@Component({
  selector: 'app-asesor-ia',
  templateUrl: './asesor-ia.component.html',
  styleUrls: ['./asesor-ia.component.css']
})
export class AsesorIaComponent implements OnInit {
  recomendacion: string = '';
  cargando: boolean = false;

  constructor(private iaService: IAService) {}

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const genero = usuario.genero || 'unisex';
    const ciudad = usuario.ciudad || 'tu ciudad';
    const temperatura = usuario.temperatura || 20;
    const clima = temperatura < 18 ? 'frío' : 'calor';

    const prompt = `Hoy en ${ciudad} hay ${temperatura}°C y el clima es ${clima}. ¿Qué prenda de moda andina recomiendas para una persona de género ${genero}?`;

    this.cargando = true;
    this.iaService.obtenerRecomendacion(prompt).subscribe({
      next: (res) => {
        this.recomendacion = res.choices[0].message.content;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener la recomendación:', err);
        this.recomendacion = 'Lo sentimos, no pudimos obtener una recomendación en este momento.';
        this.cargando = false;
      }
    });
  }
}
