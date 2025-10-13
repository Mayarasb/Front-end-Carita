import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Calendario } from '../models/calendario.model';
 
@Injectable({
  providedIn: 'root'
})

export class CalendarioService {
  private apiUrl = 'http://localhost:3000/eventos';

  constructor(private http: HttpClient) {}

  getEventos(): Observable<Calendario[]> {
    return this.http.get<Calendario[]>(this.apiUrl);
        
  }

  adicionarEvento(evento: Calendario): Observable<Calendario> {
    return this.http.post<Calendario>(this.apiUrl, evento);
  }

  atualizarEvento(evento: Calendario): Observable<Calendario> {
    return this.http.put<Calendario>(`${this.apiUrl}/${evento.id}`, evento);
  }

  removerEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}