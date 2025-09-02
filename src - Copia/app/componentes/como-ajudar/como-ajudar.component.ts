import { Component, OnInit } from '@angular/core';
import { pontoArrecadacaoService } from '../../services/pontoArrecadacao.service';
import { MapaComponent } from "../mapa/mapa.component";
import { pontoArrecadacao } from '../../models/pontosArrecadacao.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-como-ajudar',
  standalone: true,
  imports: [ MapaComponent, CommonModule],
  templateUrl: './como-ajudar.component.html',
styleUrl: './como-ajudar.component.css'
})
export class ComoAjudarComponent  implements OnInit {
  pontosArrecadacao: pontoArrecadacao[] = [];

  constructor(private service: pontoArrecadacaoService) {}

  ngOnInit(): void {
    this.service.getPontos().subscribe((dados) => {
      this.pontosArrecadacao = dados;
    });
  }
}