import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  filtro: string = '';

  constructor(private usuarioService: UsuarioService) {}

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

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "relatorio_usuarios.csv";
    link.click();
  }
}
