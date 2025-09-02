import { Component,  OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrganizacoesService } from '../../services/organizacoes.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dados-instituicao-id',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule, RouterLink],
  templateUrl: './dados-instituicao-id.component.html',
  styleUrl: './dados-instituicao-id.component.css'
})
export class DadosInstituicaoIdComponent  implements OnInit {
  formOrganizacao!: FormGroup;
  arquivos: { [key: string]: File } = {};
  formDisabled = true;
  userId = 0;
  organizacaoId: number | null = null;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private organizacaoService: OrganizacoesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userId = decoded.id;
    }

    this.inicializarFormulario();
    this.buscarOrganizacao();
  }

  inicializarFormulario() {
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

    // Inicialmente, bloqueia formulário até saber se há organização existente
    this.formOrganizacao.disable();
    this.formDisabled = true;
  }

  buscarOrganizacao() {
    this.organizacaoService.getOrganizacaoByUsuarioId(this.userId).subscribe({
      next: (org) => {
        if (org) {
          this.organizacaoId = org.id;
          this.formOrganizacao.patchValue(org);
          this.formOrganizacao.disable();
          this.formDisabled = true;
          this.successMessage = 'Dados carregados com sucesso.';
        } else {
          // Se não existe organização, libera o formulário para cadastro
          this.formOrganizacao.enable();
          this.formDisabled = false;
        }
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar dados da organização.';
        this.formOrganizacao.enable();
        this.formDisabled = false;
      }
    });
  }

  enableEditing() {
    this.formOrganizacao.enable();
    this.formDisabled = false;
    this.successMessage = '';
  }

  onFileChange(event: any, campo: string) {
    if (event.target.files.length > 0) {
      this.arquivos[campo] = event.target.files[0];
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

  onSubmit() {
    if (this.formOrganizacao.valid) {
      const formData = new FormData();

      // Adiciona arquivos ao FormData
      for (const campo in this.arquivos) {
        if (this.arquivos[campo]) {
          formData.append(campo, this.arquivos[campo]);
        }
      }

      // Adiciona campos do formulário ao FormData
      Object.entries(this.formOrganizacao.value).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (value instanceof File || value instanceof Blob) {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      if (this.organizacaoId) {
        // Atualiza organização existente
        this.organizacaoService.updateOrganizacao(this.organizacaoId, formData).subscribe({
          next: () => {
            this.formOrganizacao.disable();
            this.formDisabled = true;
            this.successMessage = 'Atualizado com sucesso!';
          },
          error: (err) => {
            this.errorMessage = 'Erro ao atualizar: ' + err.message;
          }
        });
      } else {
        // Cadastra nova organização
        this.organizacaoService.postOrganizacoes(formData).subscribe({
          next: (res) => {
            this.organizacaoId = res.id;
            this.formOrganizacao.disable();
            this.formDisabled = true;
            this.successMessage = 'Cadastrado com sucesso!';
          },
          error: (err) => {
            this.errorMessage = 'Erro ao cadastrar: ' + err.message;
          }
        });
      }
    } else {
      this.errorMessage = 'Formulário inválido. Por favor, corrija os erros.';
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/pagina-login']);
  }
}