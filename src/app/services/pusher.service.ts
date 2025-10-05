// import { Injectable } from '@angular/core';
// import Pusher from 'pusher-js';

// @Injectable({
//   providedIn: 'root'
// })
// export class PusherService {
//   private pusher: Pusher;

//   constructor() {
//     this.pusher = new Pusher('3e86810c679b6be41725', {
//       cluster: 'mt1',
//       authEndpoint: 'http://localhost:3000/pusher/auth', // endpoint do server.ts
//       auth: {
//         headers: {
//           // Authorization: 'Bearer ...' se necessário
//         }
//       }
//     });
//   }

//   // Canal público
//   subscribe(channelName: string, eventName: string, callback: (data: any) => void) {
//     const channel = this.pusher.subscribe(channelName);
//     channel.bind(eventName, callback);
//   }

//   // Canal privado
//   subscribeToPrivateChannel(channelName: string, eventName: string, callback: (data: any) => void) {
//     // 🔑 Canal privado deve começar com "private-"
//     if (!channelName.startsWith('private-')) {
//       channelName = `private-${channelName}`;
//     }
//     const channel = this.pusher.subscribe(channelName);
//     channel.bind(eventName, callback);
//   }
// }
