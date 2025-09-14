import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { pontoArrecadacaoService } from '../../services/pontoArrecadacao.service';
import { pontoArrecadacao } from '../../models/pontosArrecadacao.model';

@Component({
  selector: 'app-mapa',
  template: `<div id="map" style="height: 500px; width: 100%;"></div>`,
  standalone: true,
})



export class MapaComponent implements OnInit {
  private map!: L.Map;
  private origem: [number, number] | null = null;
  private markers: L.Marker[] = [];

  constructor() {
    // Escuta evento disparado pelo ComoAjudarComponent
    window.addEventListener('mostrarPonto', (event: any) => {
      this.adicionarPontoNoMapa(event.detail);
    });
  }

  ngOnInit(): void {
    this.initMap();
    this.pegarLocalizacaoUsuario();
  }

  private initMap(): void {
    this.map = L.map('map').setView([-23.55052, -46.633308], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private pegarLocalizacaoUsuario(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.origem = [pos.coords.latitude, pos.coords.longitude];
          this.map.setView(this.origem, 13);
          L.marker(this.origem).addTo(this.map).bindPopup('Você está aqui').openPopup();
        },
        () => alert('Não foi possível obter sua localização')
      );
    }
  }

  private async adicionarPontoNoMapa(ponto: pontoArrecadacao) {
    // Remove marcadores antigos
    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];

    // Geocodificar endereço do ponto clicado
    const endereco = `${ponto.logradouro}, ${ponto.numero}, ${ponto.bairro}, ${ponto.cidade}, ${ponto.estado}, ${ponto.cep}`;
    const coords = await this.geocodificarEndereco(endereco);
    if (!coords) return;

    // Adiciona marcador no mapa
    const marker = L.marker(coords).addTo(this.map);
    let distanciaKm = null;
    if (this.origem) {
      distanciaKm = this.calcularDistancia(this.origem, coords).toFixed(2);
    }

    // Popup com botão para abrir rota no Google Maps
    marker.bindPopup(
      `<b>${ponto.parceiro?.nome ?? 'Ponto de Arrecadação'}</b><br>
      ${ponto.logradouro}, ${ponto.numero} - ${ponto.bairro}<br>
      ${ponto.cidade} - ${ponto.estado}<br>
      Distância: ${distanciaKm ? distanciaKm + ' km' : 'N/A'}<br>
      <button onclick="window.open('https://www.google.com/maps/dir/?api=1&origin=${this.origem?.[0]},${this.origem?.[1]}&destination=${coords[0]},${coords[1]}','_blank')">
        Traçar rota no Google Maps
      </button>`
    ).openPopup();

    this.markers.push(marker);
    this.map.setView(coords, 15);
  }

  private async geocodificarEndereco(endereco: string): Promise<[number, number] | null> {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json&limit=1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (err) {
      console.error('Erro ao geocodificar endereço:', err);
      return null;
    }
  }

  private calcularDistancia(origem: [number, number], destino: [number, number]): number {
    const R = 6371;
    const dLat = this.grausParaRad(destino[0] - origem[0]);
    const dLon = this.grausParaRad(destino[1] - origem[1]);
    const lat1 = this.grausParaRad(origem[0]);
    const lat2 = this.grausParaRad(destino[0]);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private grausParaRad(valor: number): number {
    return valor * Math.PI / 180;
  }
}