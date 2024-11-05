import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquarePlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IGroup, IMessage } from '../../../interfaces/groups';
import { GROUPS } from '../../../helpers/groups';
import { ChatService } from '../../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoadingService } from '../../../services/loading.service';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent {
  groups!: IGroup[];

  filteredGroups: any[] = [];
  searchQuery: string = '';
  faSquarePlus: IconDefinition = faSquarePlus;

  selectedChat: IGroup | null = null;
  websocketSubscription!: Subscription

  constructor(
    private chatService: ChatService,
    private elementRef: ElementRef,
    private loadingService: LoadingService
  ) { }

  onSelectChat(chatGroup: IGroup) {
    this.selectedChat = chatGroup;
    this.chatService.selectChat(chatGroup);
  }

  lastMessage(group: IGroup) {
    return group.messages[group.messages.length - 1].content;
  }

  ngOnInit() {
    this.startGroups()
    this.chatService.selectedGroupChat$.subscribe(group => {
      this.selectedChat = group;
    });
    this.connectWebSocket()
  }

  ngOnDestroy(): void {
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
  }

  startGroups() {
    if (isPlatformBrowser(this.elementRef.nativeElement)) {
      return
    }

    this.loadingService.loadingOn()
    this.chatService.getGroups(997732694).pipe(
      finalize(() => this.loadingService.loadingOff())
    ).subscribe({
      next: (response) => {
        this.groups = response.body
        this.filteredGroups = this.groups;
        this.onSelectChat(this.selectedChat ? this.selectedChat : this.groups[0]);
      }
    })
  }

  connectWebSocket() {
    this.chatService.connectWebSocket()
    this.websocketSubscription = this.chatService.receiveMessage().subscribe({
      next: data => {
        let name = "Externo"
        if (data.name) {
          name = data.name
        }
        const newMessage: IMessage = {
          sender: name,
          content: data.message,
          time: data.time
        };
        this.groups.find(item => item.whats_id === data.chat)?.messages.push(newMessage)
      },
      error: error => console.error('WebSocket error:', error)
    });
  }

  filterGroups() {
    const query = this.searchQuery.toLowerCase();
    this.filteredGroups = this.groups.filter(group =>
      group.name.toLowerCase().includes(query) ||
      group.lastMessage.toLowerCase().includes(query)
    );
  }

  getTagColor(level: number): string {
    switch (level) {
      case 1:
        return '#FF5733';
      case 2:
        return '#F3FF33';
      case 3:
        return '#33FF57';
      case 4:
        return '#3357FF';
      default:
        return '#FFFFFF';
    }
  }
}
