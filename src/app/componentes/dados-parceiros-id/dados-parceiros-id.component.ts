import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ParceirosService } from '../../services/parceiros.service';
import { pontoArrecadacaoService } from '../../services/pontoArrecadacao.service';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dados-parceiros-id',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './dados-parceiros-id.component.html',
  styleUrl: './dados-parceiros-id.component.css'
})
export class DadosParceirosIdComponent implements OnInit {

  parceiro: any; // para armazenar o parceiro carregado

  formParceiros: FormGroup;
  showAlert = false;
   userId: number = 0;
  tipoParceiro: string = 'option1'; // 'option1' é o padrão (Parceiro Captador)
  private token: string | null;


  constructor(private fb: FormBuilder, private parceiroService: ParceirosService,private pontoAradacaoService: pontoArrecadacaoService, private router: Router){

    this.token = localStorage.getItem("token");
  
    if (this.token) {
      const decoded: any = jwtDecode(this.token);
      console.log(decoded);
      this.userId = decoded.id;
    }

    this.formParceiros = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      logradouro: ['', Validators.required],
      numero: ['',[Validators.required,Validators.minLength(2)]],
      bairro: ['', [Validators.required,Validators.minLength(5)]],
      cidade: ['', [Validators.required,Validators.minLength(2)]],
      estado: ['', [Validators.required,Validators.minLength(2)]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      horarioFuncionamento: ['',Validators.required],
      areaAtuacao: ['', Validators.required],
      logo: [null],
      documento: [null],
    
    });
  }

  ngOnInit() {
    if(this.userId){
      this.carregarParceiro();
    }
  }

  carregarParceiro() {
    this.parceiroService.getParceiroByUsuarioId(this.userId).subscribe({
      next: (parceiro) => {
        this.parceiro = parceiro;
        this.preencherFormulario(parceiro);
      },
      error: (err) => {
        console.error("Parceiro não encontrado", err);
        
      }
    });
  }

  preencherFormulario(parceiro: any) {
    this.formParceiros.patchValue({
      nome: parceiro.nome,
      cnpj: parceiro.cnpj,
      telefone: parceiro.telefone,
      email: parceiro.email,
      areaAtuacao: parceiro.areaAtuacao,
            
      // Dados do ponto de arrecadação (se houver)
      logradouro: parceiro.pontoArrecadacao?.logradouro || '',
      numero: parceiro.pontoArrecadacao?.numero || '',
      bairro: parceiro.pontoArrecadacao?.bairro || '',
      cidade: parceiro.pontoArrecadacao?.cidade || '',
      estado: parceiro.pontoArrecadacao?.estado || '',
      cep: parceiro.pontoArrecadacao?.cep || '',
      horarioFuncionamento: parceiro.pontoArrecadacao?.horarioFuncionamento || '',
      logo: parceiro.logo || null,
      documento: parceiro.documento || null,
    });

    this.tipoParceiro = parceiro.tipoParceiro; // Ajuste se necessário
  }

onSubmit(): void {
  if (this.formParceiros.valid) {
    const tipo = this.tipoParceiro === 'option1' ? 'Captador' : 'Divulgador';

    const parceiroPayload: any = {
      nome: this.formParceiros.value.nome,
      cnpj: this.formParceiros.value.cnpj,
      telefone: this.formParceiros.value.telefone,
      email: this.formParceiros.value.email,
      areaAtuacao: this.formParceiros.value.areaAtuacao,
      tipoParceiro: tipo,
      idUsuario: this.userId,
      logo: this.formParceiros.value.logo,
      documento: this.formParceiros.value.documento,
    };

    if (tipo === 'Captador') {
      parceiroPayload.pontoArrecadacao = {
        logradouro: this.formParceiros.value.logradouro,
        numero: this.formParceiros.value.numero,
        bairro: this.formParceiros.value.bairro,
        cidade: this.formParceiros.value.cidade,
        estado: this.formParceiros.value.estado,
        cep: this.formParceiros.value.cep,
        horarioFuncionamento: this.formParceiros.value.horarioFuncionamento
      };
    }

    this.parceiroService.postParceiros(parceiroPayload, this.token).subscribe({
      next: () => {
        this.showAlert = true;
        this.formParceiros.reset();
      },
      error: (err) => console.error("Erro ao cadastrar parceiro:", err)
    });
  }
}


  onTipoParceiroChange(tipo: string) {
    this.tipoParceiro = tipo;
  }

   logout() {
    localStorage.removeItem('token'); // ou sessionStorage.clear();
    this.router.navigate(['/pagina-login']); // redireciona para a página de login
  }
}
