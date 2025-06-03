import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IAService {
  private apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
  private apiKey = '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'; // Reemplaza con tu API Key

  constructor(private http: HttpClient) {}

  obtenerRecomendacion(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'llama3-70b-8192',
      messages: [
        { role: 'system', content: 'Eres un asesor de moda andina que recomienda prendas basadas en el clima y el género del usuario.' },
        { role: 'user', content: prompt }
      ]
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
