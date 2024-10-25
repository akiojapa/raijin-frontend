import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IGroup } from '../interfaces/groups';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private selectedGroupChat = new BehaviorSubject<IGroup | null>(null);
  selectedGroupChat$ = this.selectedGroupChat.asObservable();

  selectChat(chatGroup: IGroup) {
    this.selectedGroupChat.next(chatGroup);
  }
}
