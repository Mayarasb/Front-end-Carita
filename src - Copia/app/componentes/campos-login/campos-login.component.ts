import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-campos-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './campos-login.component.html',
  styleUrl: './campos-login.component.css'
})
export class CamposLoginComponent {
 myForm: FormGroup;
  errorMessage = '';


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.errorMessage = 'Por favor, preencha corretamente os campos.';
      return;
    }

    const { email, senha } = this.myForm.value;

    this.authService.login(email, senha).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.errorMessage = '';
        // Redirecione para a página principal ou dashboard
        this.router.navigate(['/pagina-preCadastro']); // Altere '/dashboard' para a rota desejada
        console.log('Login com sucesso, token salvo no localStorage.');
      },
      error: (err) => {
        this.errorMessage = 'E-mail ou senha inválidos.';
        console.error(err);
      }
    });
  }
}

