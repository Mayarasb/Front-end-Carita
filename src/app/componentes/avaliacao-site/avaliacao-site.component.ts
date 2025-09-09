import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-avaliacao-site',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './avaliacao-site.component.html',
  styleUrl: './avaliacao-site.component.css'
})
export class AvaliacaoSiteComponent {

  AvaliacaoForm: FormGroup;
  showAlert = false;
 
  constructor(private fb: FormBuilder, private router: Router) {
    this.AvaliacaoForm = this.fb.group({
      mensagem: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
 
 
  async onSubmit(): Promise<void> {
    if (this.AvaliacaoForm.valid) {
      console.log('Formulário válido:', this.AvaliacaoForm.value);
      this.showAlert = true;

    } else {
      console.log('Formulário inválido');
    }
  }

    logout() {
    localStorage.removeItem('token'); // ou sessionStorage.clear();
    this.router.navigate(['/pagina-login']); // redireciona para a página de login
  }
}

