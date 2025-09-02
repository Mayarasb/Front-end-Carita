import { Component,HostListener } from '@angular/core';
import { RouterOutlet,NavigationEnd,Router } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./componentes/footer/footer.component";
import { AcessibilidadeComponent } from "./componentes/acessibilidade/acessibilidade.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AcessibilidadeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'CaritaII';
  focaveis: HTMLElement[] = [];
   focoAtual: number = 0;
isTeclado = false;
  constructor(private router: Router) {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      
        this.atualizarFocaveis();
    this.focarElemento(this.focoAtual);
    });

    this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd && !this.isTeclado) {
      setTimeout(() => {
        const elementoAtual = document.activeElement as HTMLElement;
        if (elementoAtual && typeof elementoAtual.blur === 'function') {
          elementoAtual.blur();
        }
        this.atualizarFocaveis();
      }, 50);
    }
  });
}

  atualizarFocaveis() {

    this.focaveis = Array.from(
      document.querySelectorAll<HTMLElement>(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null  &&
  el.id !== 'map');
  }
focarElemento(index: number) {
    if (this.focaveis.length === 0) return;

    this.focaveis.forEach((el, i) => {
      if (i === index) {
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.isTeclado = true;
    document.body.classList.add('usando-teclado');
  }

  @HostListener('document:mousedown')
  onMouseDown() {
    this.isTeclado = false;
    document.body.classList.remove('usando-teclado');
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const alvo = event.target as HTMLElement;
    const index = this.focaveis.indexOf(alvo);
    if (index !== -1) {
      this.focoAtual = index;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKey(event: KeyboardEvent) {
    if (this.focaveis.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        this.focoAtual = (this.focoAtual + 1) % this.focaveis.length;
        this.focarElemento(this.focoAtual);
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        this.focoAtual = (this.focoAtual - 1 + this.focaveis.length) % this.focaveis.length;
        this.focarElemento(this.focoAtual);
        break;

      case 'Enter':
        event.preventDefault();
        const el = this.focaveis[this.focoAtual];
        if (el.tagName === 'A') {
          window.location.href = (el as HTMLAnchorElement).href;
        } else {
          (el as HTMLElement).click();
        }
        break;
    }
  }



}
