import { Injectable, signal } from '@angular/core';
import { SocketService } from './socket.service';

export type HelperBanner = {
  message: string;
  at: string;
};

@Injectable({ providedIn: 'root' })
export class HelperBannerService {
  // mensagem atual
  currentMessage = signal<string>('');
  // controle de visibilidade
  visible = signal<boolean>(false);
  // lista local de mensagens padrão
  private defaultMessages = [
    'Faça a diferença hoje!',
    'Sua ajuda transforma vidas.',
    'Doe e espalhe solidariedade!',
    'Toda contribuição conta!',
    'Ajudar é um ato de amor 💛'
  ];

  private hideTimer?: any;

  constructor(private sockets: SocketService) {}

  init() {
    this.sockets.connect();

    // Recebe mensagens em tempo real do servidor
    this.sockets.on<HelperBanner>('helper:banner').subscribe((b) => {
      this.showMessage(b.message);
    });

    // Mostra uma mensagem padrão inicial
    const first = this.defaultMessages[Math.floor(Math.random() * this.defaultMessages.length)];
    this.showMessage(first);
  }

  /** Exibe uma mensagem e oculta automaticamente após 10s */
  private showMessage(msg: string) {
    this.currentMessage.set(msg);
    this.visible.set(true);

    if (this.hideTimer) clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => {
      this.visible.set(false);
    }, 10000); // 10 segundos visível
  }
}
