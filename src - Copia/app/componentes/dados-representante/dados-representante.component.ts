import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import  {UsuarioService } from '../../services/usuario.service';
import { jwtDecode } from 'jwt-decode';
import { OrganizacoesService } from '../../services/organizacoes.service';

@Component({
  selector: 'app-dados-representante',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './dados-representante.component.html',
  styleUrls: ['./dados-representante.component.css']
})
export class DadosRepresentanteComponent implements OnInit {
  RepresentanteForm: FormGroup;
  errorMessage = '';
  showAlert = false;
  userId: number = 0;

  constructor(private fb: FormBuilder,private usuarioService : UsuarioService, private router: Router, private organizacaoService: OrganizacoesService,){

    const token: any = localStorage.getItem("token");
          console.log(token)
          if (token) {
            const decoded: any = jwtDecode(token);
            console.log(decoded);
            this.userId = decoded.id;
          }

    this.RepresentanteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Usando array para validadores
      cpf: ['', [Validators.required, Validators.minLength(11)]],  // Usando array para validadores
     // nome: ['', [Validators.required, Validators.minLength(3)]]  // Usando array para validadores
    });
  }


   ngOnInit(): void {
    if (this.userId) {
      this.usuarioService.getUsuarioPorId(this.userId).subscribe({
        next: (usuario) => {
          console.log('Usuário carregado:', usuario);
          this.RepresentanteForm.patchValue({
            email: usuario.email,
            cpf: usuario.cpf,

          });
        },
        error: (err) => {
          console.error('Erro ao buscar usuário:', err);
          alert('Usuário não encontrado');
        }
      });
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


 onSubmit(): void {
  if (this.RepresentanteForm.valid) {
    const dadosAtualizados = this.RepresentanteForm.value;

    this.usuarioService.updateUsuario(this.userId, dadosAtualizados).subscribe({
      next: (res) => {
        console.log('Usuário atualizado com sucesso:', res);
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 4000);
      },
      error: (err) => {
        console.error('Erro ao atualizar usuário:', err);
        this.errorMessage = 'Erro ao atualizar os dados.';
      }
    });
  } else {
    console.log('Formulário inválido');
  }
}

    logout() {
    localStorage.removeItem('token'); // ou sessionStorage.clear();
    this.router.navigate(['/pagina-login']); // redireciona para a página de login
  }
}



