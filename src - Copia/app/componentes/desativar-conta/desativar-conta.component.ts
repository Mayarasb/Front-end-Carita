import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { OrganizacoesService } from '../../services/organizacoes.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-desativar-conta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './desativar-conta.component.html',
  styleUrl: './desativar-conta.component.css'
})
export class DesativarContaComponent {

  userId: number = 0;

  constructor(
    private router: Router,
    private organizacaoService: OrganizacoesService,
    private usuarioService: UsuarioService
  ) {
    const token: any = localStorage.getItem('token');
    console.log(token);
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log(decoded);
      this.userId = decoded.id;
    }
  }

 irParaDadosOrganizacao() {
  if (!this.userId) {
    this.router.navigate(['/pagina-login']);
    return;
  }

  this.organizacaoService.getOrganizacaoByUsuarioId(this.userId).subscribe({
    next: (org) => {
      if (org && Object.keys(org).length > 0) {
        this.router.navigate(['/pagina-ongId']); // Página de visualização/edição
      } else {
        this.router.navigate(['/pagina-ong']); // Página de cadastro
      }
    },
    error: (err) => {
      console.error('Erro ao verificar organização:', err);

      // Se for erro 404, significa que ainda não tem organização cadastrada
      if (err.status === 404) {
        this.router.navigate(['/pagina-ong']); // Vai para página de cadastro
      } else {
        this.router.navigate(['/pagina-login']); // Outros erros, vai para login
      }
    }
  });
}
desativarConta() {
  if (!this.userId) return;

  this.usuarioService.desativarUsuario(this.userId).subscribe({
    next: (res) => {
      console.log('Conta desativada:', res);
      localStorage.removeItem('token'); // limpa o token após desativar
      this.router.navigate(['/pagina-login']); // redireciona
    },
    error: (err) => {
      console.error('Erro ao desativar a conta:', err);
      alert('Erro ao desativar a conta. Tente novamente.');
    }
  });
}

  logout() {
    localStorage.removeItem('token'); // ou sessionStorage.clear();
    this.router.navigate(['/pagina-login']); // redireciona para a página de login
  }
}
