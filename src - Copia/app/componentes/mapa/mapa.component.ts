import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-mapa',
  template: `<div id="map" style="height: 500px; width: 100%;"></div>`,
  standalone: true,
})
export class MapaComponent implements OnInit {
  private map!: L.Map;
  private origem: [number, number] | null = null;
  private routingControl: any;

  ngOnInit(): void {
    this.initMap();
    this.pegarLocalizacaoUsuario();
  }

  private initMap(): void {
    this.map = L.map('map').setView([-23.55052, -46.633308], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
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

  public mostrarRota(destino: [number, number]): void {
    if (!this.origem) {
      alert('Localização do usuário não disponível');
      return;
    }

    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }

    this.routingControl = (L as any).Routing.control({
      waypoints: [
        L.latLng(this.origem[0], this.origem[1]),
        L.latLng(destino[0], destino[1]),
      ],
      routeWhileDragging: true,
      draggableWaypoints: false,
      addWaypoints: false,
    }).addTo(this.map);

    this.map.fitBounds(L.latLngBounds([this.origem, destino]).pad(0.5));
  }
}
