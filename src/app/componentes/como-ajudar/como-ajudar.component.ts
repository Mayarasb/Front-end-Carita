import { Component, OnInit } from '@angular/core';
import { pontoArrecadacaoService } from '../../services/pontoArrecadacao.service';
import { MapaComponent } from "../mapa/mapa.component";
import { pontoArrecadacao } from '../../models/pontosArrecadacao.model';
import { CommonModule } from '@angular/common';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-como-ajudar',
  standalone: true,
  imports: [ MapaComponent, CommonModule],
  templateUrl: './como-ajudar.component.html',
styleUrl: './como-ajudar.component.css'
})
export class ComoAjudarComponent implements OnInit {
  pontosArrecadacao: pontoArrecadacao[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;

  constructor(private service: pontoArrecadacaoService) {}

  ngOnInit(): void {
    this.service.getPontos().subscribe((dados) => {
      this.pontosArrecadacao = dados;
      this.totalPages = Math.ceil(this.pontosArrecadacao.length / this.itemsPerPage);
    });
  }

  // Retorna os pontos da página atual
  get paginatedPontos(): pontoArrecadacao[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.pontosArrecadacao.slice(startIndex, endIndex);
  }

  // Muda para uma página específica
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Página anterior
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Próxima página
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  gerarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Lista de Pontos de Arrecadação", 10, 10);
    let y = 20;

    this.pontosArrecadacao.forEach((ponto, index) => {
      const parceiro = ponto.parceiro?.nome ?? "Parceiro não informado";
      const endereco = `${ponto.logradouro}, ${ponto.numero} – ${ponto.bairro}, ${ponto.cidade} - ${ponto.estado}, ${ponto.cep}`;

      doc.setFontSize(12);
      doc.text(`${index + 1}. ${parceiro}`, 10, y);
      y += 7;

      doc.setFontSize(10);
      doc.text(`Endereço: ${endereco}`, 15, y);
      y += 12;

      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("pontos-arrecadacao.pdf");
  }

  mostrarNoMapa(ponto: pontoArrecadacao) {
    window.dispatchEvent(new CustomEvent('mostrarPonto', { detail: ponto }));
  }
}