import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, timer } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;

  constructor() { }

  // Método para inicializar a conexão WebSocket com URL dinâmica
  public connect(url: string): void {
    if (this.socket$) {
      this.socket$.complete(); // Fechar conexão anterior, se existir
    }

    this.socket$ = webSocket(url);

    // Reconnexão automática em caso de falha
    this.socket$.pipe(
      retry({
        delay: (error, retryCount) => {
          console.log(`Tentativa de reconexão #${retryCount} após erro:`, error);
          return timer(2000); // Atraso de 2 segundos antes de tentar reconectar
        }
      })
    ).subscribe({
      next: msg => console.log('Received: ', msg),
      error: err => console.error('WebSocket error: ', err),
      complete: () => console.log('Connection Closed')
    })
  }

  // Método para enviar uma mensagem via WebSocket
  public sendMessage(msg: any): void {
    this.socket$.next(msg);
  }

  // Método para receber mensagens
  public onMessage(): Observable<any> {
    return this.socket$.asObservable();
  }

  // Método para fechar a conexão WebSocket
  public closeConnection(): void {
    if (this.socket$) {
      this.socket$.complete(); // Fecha a conexão ativa
    }
  }
}
