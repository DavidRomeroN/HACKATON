import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-asistente-semanal',
  templateUrl: './asistente-semanal.component.html',
  styleUrls: ['./asistente-semanal.component.css']
})
export class AsistenteSemanalComponent implements OnInit {
  recomendacion: any[] = [];
  usuarioLogueado = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const usuarioStr = localStorage.getItem('usuario');

    if (!usuarioStr) {
      this.usuarioLogueado = false;
      return;
    }

    this.usuarioLogueado = true;

    const usuario = JSON.parse(usuarioStr);
    const genero = usuario.genero || 'unisex';

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        this.http.get<any[]>(`http://localhost:8080/api/curador/recomendacion-semanal?lat=${lat}&lon=${lon}&genero=${genero}`)
          .subscribe({
            next: data => this.recomendacion = data,
            error: err => console.error('❌ No se pudo obtener la recomendación:', err)
          });
      },
      (err) => {
        console.warn('⚠️ No se pudo obtener la ubicación:', err);
      }
    );
  }
}
