import { Component, OnInit } from '@angular/core';
import { pontoArrecadacaoService } from '../../services/pontoArrecadacao.service';
import { MapaComponent } from "../mapa/mapa.component";
import { pontoArrecadacao } from '../../models/pontosArrecadacao.model';
import { CommonModule } from '@angular/common';
import { jsPDF } from "jspdf";
import { CalendarioComponent } from "../calendario/calendario.component";


@Component({
  selector: 'app-como-ajudar',
  standalone: true,
  imports: [ MapaComponent, CommonModule,CalendarioComponent],
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
    const doc = new jsPDF(); // Cria um PDF em branco
    doc.setFontSize(16);// Define o tamanho da letra do título
    doc.text("Lista de Pontos de Arrecadação", 10, 10); // Escreve o título no topo da página
    let y = 20;   // Define a posição inicial onde começará a escrever os itens

    // Percorre todos os pontos de arrecadação da lista
    this.pontosArrecadacao.forEach((ponto, index) => {
      const parceiro = ponto.parceiro?.nome ?? "Parceiro não informado";   // Pega o nome do parceiro, ou mostra 'não informado' se não existir
      const endereco = `${ponto.logradouro}, ${ponto.numero} – ${ponto.bairro}, ${ponto.cidade} - ${ponto.estado}, ${ponto.cep}`; // Monta o endereço completo em uma única linha 

 
      doc.setFontSize(12);// Define o tamanho da letra para o nome do parceiro
      doc.text(`${index + 1}. ${parceiro}`, 10, y); // Escreve o número do ponto + nome do parceiro
      y += 7;// Pula uma linha

      doc.setFontSize(10);// Define o tamanho da letra menor para o endereço
      doc.text(`Endereço: ${endereco}`, 15, y); // Escreve o endereço
      y += 12;// Pula mais espaço antes do próximo item


       // Se chegar no fim da página, cria uma nova e continua escrevendo 
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });
     
    doc.save("pontos-arrecadacao.pdf"); // Salva o PDF com esse nome
  }

  mostrarNoMapa(ponto: pontoArrecadacao) {
    window.dispatchEvent(new CustomEvent('mostrarPonto', { detail: ponto }));
  }
}

