import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquarePlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Group, IGroup, IMessage, Message } from '../../../interfaces/groups';
import { GROUPS } from '../../../helpers/groups';
import { ChatService } from '../../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoadingService } from '../../../services/loading.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent {
  groups!: Group[];

  filteredGroups: any[] = [];
  searchQuery: string = '';
  faSquarePlus: IconDefinition = faSquarePlus;

  openTicket: boolean = false;

  selectedChat: Group | null = null;
  websocketSubscription!: Subscription

  constructor(
    private chatService: ChatService,
    private elementRef: ElementRef,
    private loadingService: LoadingService
  ) { }

  onSelectChat(chatGroup: Group) {
    this.selectedChat = chatGroup;
    this.chatService.selectChat(chatGroup);
  }

  lastMessage(group: Group) {
    return group.messages[group.messages.length - 1].content;
  }

  ngOnInit() {
    this.startGroups()

    this.chatService.isTicketMessageOpen$.subscribe(isOpen => {
      this.openTicket = isOpen;
    });

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
    this.chatService.getGroups(554498834847).pipe(
      finalize(() => this.loadingService.loadingOff())
    ).subscribe({
      next: (response) => {
        this.groups = response.body.map((item: IGroup) => {
          return new Group({
            whats_id: item.whats_id,
            imageUrl: item.imageUrl,
            name: item.name,
            participants: item.participants,
            priority: item.priority,
            messages: item.messages.map((m: IMessage) => {
              return new Message({
                content: m.content,
                sender: m.sender,
                time: m.time
              })
            })
          })
        })

        this.groups.sort((groupA, groupB) => {
          let priorityA = 0
          let priorityB = 0

          if (groupA && groupA.priority) {
            priorityA = groupA.priority
          }

          if (groupB && groupB.priority) {
            priorityB = groupB.priority
          }

          return priorityB - priorityA
        }).map(group => {
          group.messages.sort((messageA, messageB) => {
            return messageA.time - messageB.time
          })
        });

        this.filteredGroups = this.groups
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
        const newMessage = new Message(
          {
            sender: name,
            content: data.message,
            time: data.timestamp
          }
        )
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
      case 4:
        return '#FF0000'; // red
      case 3:
        return '#FFFF00'; // yellow
      case 2:
        return '#1FD400'; // green
      case 1:
        return '#FFFFFF'; // white
      default:
        return '';
    }
  }
}
