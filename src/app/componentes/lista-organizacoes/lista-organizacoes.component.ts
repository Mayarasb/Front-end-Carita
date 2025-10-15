import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrganizacoesService } from '../../services/organizacoes.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-organizacoes',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './lista-organizacoes.component.html',
  styleUrl: './lista-organizacoes.component.css'
})
export class ListaOrganizacoesComponent implements OnInit {
  organizacoes: any[] = [];
  filtro: string = '';

  constructor(private organizacaoService: OrganizacoesService, private router: Router) {}

  ngOnInit(): void {
    this.organizacaoService.getOrganizacoes().subscribe({
      next: (res: any) => {
        this.organizacoes = res.organizacoes || [];
      },
      error: (err) => {
        console.error('Erro ao buscar organizações:', err);
      }
    });
  }

  organizacoesFiltradas() {
    return this.organizacoes.filter(o =>
      o.email?.toLowerCase().includes(this.filtro.toLowerCase()) ||
      o.cnpj?.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

exportarRelatorio() {
  const linhas = this.organizacoes.map(o =>
    `${o.id};${o.nome};${o.email};${o.cnpj};${new Date(o.createdAt).toLocaleDateString()};${o.status ? 'Ativo' : 'Inativo'}`
  );
  const cabecalho = "ID;Nome;E-mail;CNPJ;Data de Criação;Situação";
  const csv = [cabecalho, ...linhas].join("\n");

  // Adiciona BOM (caracter UTF-8) para o Excel reconhecer os acentos
  const bom = '\uFEFF';

  const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "relatorio_organizacoes.csv";
  link.click();
}

    logout() {
    localStorage.removeItem('token'); // ou sessionStorage.clear();
    this.router.navigate(['/pagina-login']); // redireciona para a página de login
  }
}
