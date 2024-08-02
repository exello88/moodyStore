import { ApplicationRef, inject, Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketServiceService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000', { autoConnect: false });
    inject(ApplicationRef).isStable.pipe(
      first((isStable) => isStable))
    .subscribe(() => { this.socket.connect() });
  }
}
