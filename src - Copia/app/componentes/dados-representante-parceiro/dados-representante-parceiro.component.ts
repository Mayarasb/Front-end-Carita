import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import  {UsuarioService } from '../../services/usuario.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dados-representante-parceiro',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './dados-representante-parceiro.component.html',
  styleUrl: './dados-representante-parceiro.component.css'
})
export class DadosRepresentanteParceiroComponent implements OnInit {
  RepresentanteParceirosForm: FormGroup;
  showAlert = false;
  errorMessage = '';
  userId: number = 0;

  constructor(private fb: FormBuilder,private usuarioService : UsuarioService, private router: Router) {

    const token: any = localStorage.getItem("token");
              console.log(token)
              if (token) {
                const decoded: any = jwtDecode(token);
                console.log(decoded);
                this.userId = decoded.id;
              }
    this.RepresentanteParceirosForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Usando array para validadores
      cpf: ['', [Validators.required, Validators.minLength(11)]],  // Usando array para validadores
     /* nome: ['', [Validators.required, Validators.minLength(3)]]  // Usando array para validadores
     */
    });
  }

    ngOnInit(): void {
    if (this.userId) {
      this.usuarioService.getUsuarioPorId(this.userId).subscribe({
        next: (usuario) => {
          console.log('Usuário carregado:', usuario);
          this.RepresentanteParceirosForm.patchValue({
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

  onSubmit(): void {
  if (this.RepresentanteParceirosForm.valid) {
    const dadosAtualizados = this.RepresentanteParceirosForm.value;

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


