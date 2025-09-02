import { Component } from '@angular/core';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrganizacoesService } from '../../services/organizacoes.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dados-instituicao',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './dados-instituicao.component.html',
  styleUrl: './dados-instituicao.component.css'
})
export class DadosInstituicaoComponent  {
 formOrganizacao: FormGroup;
  arquivos: { [key: string]: File } = {};
  userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private organizacaoService: OrganizacoesService,
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userId = decoded.id;
    }

    this.formOrganizacao = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required],
      numeroPix: ['', Validators.required],
      site: [''],
      tipoInstituicao: ['', Validators.required],
      anoFundacao: ['', Validators.required],
      areaAtuacao: ['', Validators.required],
      descricaoInstituicao: ['', Validators.required],
      logo: [null],
      documento: [null],
      qrCode: [null],
      idUsuario: [this.userId]
    });
  }

  onFileChange(event: any, campo: string) {
    if (event.target.files.length > 0) {
      this.arquivos[campo] = event.target.files[0];
    }
  }

  

  onSubmit() {
    if (this.formOrganizacao.valid) {
      const formData = new FormData();
      for (const chave in this.arquivos) {
        formData.append(chave, this.arquivos[chave]);
      }
      Object.entries(this.formOrganizacao.value).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value instanceof Blob ? value : String(value));
        }
      });

      this.organizacaoService.postOrganizacoes(formData).subscribe({
        next: () => this.router.navigate(['/pagina-ongId']),
        error: err => console.error('Erro ao cadastrar:', err)
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

    logout() {
    localStorage.removeItem('token'); // ou sessionStorage.clear();
    this.router.navigate(['/pagina-login']); // redireciona para a página de login
  }
}