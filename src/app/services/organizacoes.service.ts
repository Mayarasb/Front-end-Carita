
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrganizacoesService {

  private baseUrl = 'http://localhost:3000'; // URL do seu backend


  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`
    };
  }

  getOrganizacoes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/organizacoes`);
  }

  postOrganizacoes(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/organizacoes`, payload, {
      headers: this.getAuthHeaders()});
  }
getOrganizacaoByUsuarioId(idUsuario: number | string): Observable<any> {
  return this.http.get(`${this.baseUrl}/organizacoes/usuario/${idUsuario}`, {
      headers: this.getAuthHeaders()});
}

updateOrganizacao(id: number, payload: any): Observable<any> {
  return this.http.put(`${this.baseUrl}/organizacoes/${id}`, payload, {
      headers: this.getAuthHeaders()});
}
}
