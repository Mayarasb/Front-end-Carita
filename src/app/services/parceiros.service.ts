
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})

export class ParceirosService {
 
  private baseUrl = 'http://localhost:3000'; // URL do seu backend
 
 
  constructor(private http: HttpClient) { }
 
  getParceiros(): Observable<any> {
    return this.http.get(`${this.baseUrl}/parceiros`);
  }

postParceiros(payload: any, token: string | null): Observable<any> {
  const headers = { 'Authorization': `Bearer ${token}` };
  return this.http.post(`${this.baseUrl}/parceiros/cadastrar-com-ponto`, payload, { headers });
}

getParceiroByUsuarioId(idUsuario: number | string): Observable<any> {
  return this.http.get(`${this.baseUrl}/parceiros/usuario/${idUsuario}`);
}

}