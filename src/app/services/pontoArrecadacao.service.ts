
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { pontoArrecadacao } from '../models/pontosArrecadacao.model';
 
@Injectable({
  providedIn: 'root'
})

export class pontoArrecadacaoService {
 
  private baseUrl = 'http://localhost:3000'; 
 
 
  constructor(private http: HttpClient) { }
 
getPontos(): Observable<pontoArrecadacao[]> {
  return this.http.get<{ pontosArrecadacao: pontoArrecadacao[] }>(`${this.baseUrl}/pontosArrecadacao`)
    .pipe(
      map(response => response.pontosArrecadacao)
    );
}

createPonto(ponto: pontoArrecadacao): Observable<pontoArrecadacao> {
  return this.http.post<pontoArrecadacao>(`${this.baseUrl}/pontosArrecadacao`, ponto);
}

updatePonto(id: number, ponto: pontoArrecadacao): Observable<pontoArrecadacao> {
  return this.http.put<pontoArrecadacao>(`${this.baseUrl}/pontosArrecadacao/${id}`, ponto);
}


}