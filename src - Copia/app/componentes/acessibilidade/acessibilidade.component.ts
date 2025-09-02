import { Component, HostListener, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-acessibilidade',
  templateUrl: './acessibilidade.component.html',
  styleUrls: ['./acessibilidade.component.css'],
  standalone: true,
})
export class AcessibilidadeComponent implements AfterViewInit {
  estado = false;
  fala: SpeechSynthesisUtterance | null = null;
  iconeLeitura: HTMLImageElement | null = null;
  focaveis: HTMLElement[] = [];
  focoAtual: number = 0;

  ngAfterViewInit(): void {
    this.iconeLeitura = document.getElementById('iconeLeitura') as HTMLImageElement;
  }

  alternarEstadoLeitura() {
    this.estado = !this.estado;
    this.estado ? this.lerPagina() : this.pararLeitura();
  }

  lerPagina() {
    const texto = document.body.innerText;
    this.fala = new SpeechSynthesisUtterance(texto);
    this.fala.lang = 'pt-BR';

    if (this.iconeLeitura) {
      this.iconeLeitura.src = '../img/sem-som.png';
      this.iconeLeitura.alt = 'Parar Leitura';
    }

    speechSynthesis.speak(this.fala);
  }

  pararLeitura() {
    if (this.iconeLeitura) {
      this.iconeLeitura.src = '../img/volume.png';
      this.iconeLeitura.alt = 'Iniciar Leitura';
    }

    speechSynthesis.cancel();
  }

 trocaCor() {
   console.log('Botão Preto e Branco clicado!');
  document.body.classList.toggle('modo-preto-branco');
}

}
