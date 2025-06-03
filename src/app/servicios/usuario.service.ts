import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'http://localhost:8080/api/usuarios/registrar';

  constructor(private http: HttpClient) { }

  registrarUsuario(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }

  login(correo: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/usuarios/login', { correo });
  }
}
