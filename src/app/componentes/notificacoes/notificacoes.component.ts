// import { Component, OnInit } from '@angular/core';
// import { PusherService } from '../../services/pusher.service';
// import { CommonModule } from '@angular/common';
// import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-notificacoes',
//   standalone: true,
//   imports: [CommonModule, MatSnackBarModule],
//   templateUrl: './notificacoes.component.html',
//   styleUrls: ['./notificacoes.component.css']
// })
// export class NotificacoesComponent implements OnInit {
//   notificacoes: any[] = [];

//   constructor(private pusherService: PusherService, private snackBar: MatSnackBar) {}

//   ngOnInit(): void {
//     // Subscribing to private channel
//     this.pusherService.subscribeToPrivateChannel('lembretes-channel', 'nova-notificacao', (data) => {
//       this.notificacoes.push(data);

//       // Mostrar snackbar
//       this.snackBar.open(data.mensagem, 'Fechar', { duration: 5000 });
//     });
//   }

//   // Função para disparar notificação de teste via backend
//   enviarTeste() {
//     fetch('http://localhost:3000/send-reminder', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         titulo: 'Teste Front',
//         mensagem: 'Mensagem de teste do Angular'
//       })
//     })
//     .then(res => res.json())
//     .then(data => console.log('Notificação enviada:', data))
//     .catch(err => console.error('Erro ao enviar:', err));
//   }
// }
