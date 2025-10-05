import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { HelperBannerService } from '../../services/helper-banners.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-helper-banner',
  imports: [NgIf],
  template: `
    <div 
      class="helper-banner"
      *ngIf="svc.visible()"
      [@fadeInOut]>
      <h4>Ajude quem precisa 💛</h4>
      <p>{{ svc.currentMessage() }}</p>
      <div class="helper-actions">
        <button class="btn" (click)="doar()">Doar agora</button>
        <button class="btn" (click)="saibaMais()">Saiba mais</button>
      </div>
    </div>
  `,
  styles: [`
    .helper-banner {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      max-width: 320px;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: .75rem 1rem;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      z-index: 9999;
      animation: fadeIn .4s ease;
    }

    .helper-banner h4 {
      margin: 0 0 .25rem 0;
      font-size: 1rem;
      font-weight: 600;
    }

    .helper-banner p {
      margin: 0;
      line-height: 1.3;
    }

    .helper-actions {
      margin-top: .5rem;
      display: flex;
      gap: .5rem;
    }

    .btn {
      appearance: none;
      border: 1px solid #11182722;
      border-radius: 8px;
      padding: .4rem .7rem;
      cursor: pointer;
      background: #f9fafb;
      transition: all .2s ease;
    }

    .btn:hover {
      background: #f3f4f6;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `],
  animations: []
})
export class HelperBannerComponent implements OnInit {
  svc = inject(HelperBannerService);
  router = inject(Router);

  ngOnInit() {
    this.svc.init();
  }

  doar() {
    this.router.navigate(['/pagina-comoAjudar']); // redireciona internamente
  }

  saibaMais() {
    this.router.navigate(['/pagina-sobre']);
  }
}
