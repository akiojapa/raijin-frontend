import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Group, Message } from '../interfaces/groups';
import { ConfigService } from './config.service';
import { WebSocketService } from './webhook.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http: ConfigService,
    private websocketService: WebSocketService,
  ) { }

  private isTicketMessageOpen = new BehaviorSubject<boolean>(false);
  isTicketMessageOpen$ = this.isTicketMessageOpen.asObservable();

  private selectedGroupChat = new BehaviorSubject<Group | null>(null);
  selectedGroupChat$ = this.selectedGroupChat.asObservable();

  getGroups(number: number) {
    return this.http.get('groups', {
      "number": number
    })
  }

  selectChat(chatGroup: Group) {
    this.selectedGroupChat.next(chatGroup);
  }

  openTicketMessage(isTicket: boolean) {
    this.isTicketMessageOpen.next(isTicket);
  }

  connectWebSocket() {
    const websocketUrl = `ws://98.84.80.9:8002/ws/chat`;
    this.websocketService?.connect(websocketUrl);
  }

  receiveMessage() {
    return this.websocketService.onMessage()
  }

  sendMessage(message: Message, phoneNumber: string, chat_id: string, companyName: string) {
    this.websocketService.sendMessage({
      'chat_id': chat_id,
      'from_number': phoneNumber,
      'from_name': message.sender,
      'content': message.content,
      'type': 'Text',
      'received': false,
      'company': companyName,
      'timestamp': message.time
    });
  }

  openChat() {
    this.isTicketMessageOpen.next(true);
  }

  closeChat() {
    this.isTicketMessageOpen.next(false);
  }
}
