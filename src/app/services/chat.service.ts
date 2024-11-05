import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGroup } from '../interfaces/groups';
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

  private selectedGroupChat = new BehaviorSubject<IGroup | null>(null);
  selectedGroupChat$ = this.selectedGroupChat.asObservable();

  getGroups(number: number) {
    return this.http.get('groups', {
      "number": number
    })
  }

  selectChat(chatGroup: IGroup) {
    this.selectedGroupChat.next(chatGroup);
  }

  connectWebSocket(){
    const websocketUrl = `ws://127.0.0.1:8000/ws/chat`;

    this.websocketService?.connect(websocketUrl);
  }

  receiveMessage(){
    return this.websocketService.onMessage()
  }

  sendMessage(chat_id: string, message: string, companyName: string ){
    this.websocketService.sendMessage({
      'chat_id': chat_id,
      'from_number': '997732694',
      'from_name': 'Renan Dias',
      'content': message,
      'type': 'Text',
      'received': false,
      'company': companyName,
      'timestamp': new Date().getTime()
    });
  }
}
