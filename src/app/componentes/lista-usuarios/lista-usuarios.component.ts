import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  filtro: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioService.getUsuario().subscribe({
      next: (res: any) => {
        this.usuarios = res.usuarios || [];
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
      }
    });
  }

  usuariosFiltrados() {
    return this.usuarios.filter(u =>
      u.email?.toLowerCase().includes(this.filtro.toLowerCase()) ||
      u.cpf?.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

exportarRelatorio() {
  const linhas = this.usuarios.map(u =>
    `${u.email};${u.cpf};${new Date(u.createdAt).toLocaleDateString()};${u.status ? 'Ativo' : 'Inativo'}`
  );
  const cabecalho = "E-mail;CPF;Data de Criação;Situação";
  const csv = [cabecalho, ...linhas].join("\n");

  // Adiciona BOM (caracter UTF-8) para o Excel reconhecer os acentos
  const bom = '\uFEFF';

  const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "relatorio_usuarios.csv";
  link.click();
}

    logout() {
    localStorage.removeItem('token'); // ou sessionStorage.clear();
    this.router.navigate(['/pagina-login']); // redireciona para a página de login
  }
}
