import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  obtenerRecomendados(genero: string, clima: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/recomendados?genero=${genero}&clima=${clima}`);
  }
  obtenerTodos() {
    return this.http.get<any[]>('http://localhost:8080/api/productos');
  }
}
