import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { SOCKET_URL } from 'src/app/config';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  constructor() { }

  initSocket(): void {
    this.socket = socketIo(SOCKET_URL);
    // console.log(this.socket)
    this.socket.on('incomingMessage', (res) => {
      console.log(res)
      // this.socket.on('res', (res) => {
      //   console.log(res)
      // })
    })


    console.log('init socket')
  }
}
