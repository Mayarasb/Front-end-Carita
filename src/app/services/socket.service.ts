import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket?: Socket;

  connect() {
    if (this.socket?.connected) return;
    this.socket = io('http://localhost:3000', {
      transports: ['websocket']
    });
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = undefined;
  }

  on<T = any>(event: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      const handler = (data: T) => subscriber.next(data);
      this.socket?.on(event, handler);
      return () => this.socket?.off(event, handler);
    }).pipe(shareReplay(1));
  }

  emit(event: string, data?: any) {
    this.socket?.emit(event, data);
  }
}
