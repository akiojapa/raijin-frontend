import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquarePlus, IconDefinition, faTag } from '@fortawesome/free-solid-svg-icons';
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
  faTag: IconDefinition = faTag;
  showDropdownTags: boolean = false;
  availableTags: { name: string; color: string }[] = [
    { name: 'Tag 1', color: '#C70039' },
    { name: 'Tag 2', color: '#1842d0' },
    { name: 'Tag 3', color: '#c509db' },
    { name: 'Tag 4', color: '#ea16b0' },
    { name: 'Tag 5', color: '#969398' }
  ];
  selectedTags: string[] = [];

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
    // this.chatService.getGroups(554497732694).pipe(
    //   finalize(() => this.loadingService.loadingOff())
    // ).subscribe({
    //   next: (response) => {
    //     this.groups = response.body.map((item: IGroup) => {
    //       return new Group({
    //         whats_id: item.whats_id,
    //         imageUrl: item.imageUrl,
    //         name: item.name,
    //         participants: item.participants,
    //         priority: item.priority,
    //         messages: item.messages.map((m: IMessage) => {
    //           return new Message({
    //             content: m.content,
    //             sender: m.sender,
    //             time: m.time
    //           })
    //         })
    //       })
    //     })

    //     this.groups.sort((groupA, groupB) => {
    //       let priorityA = 0
    //       let priorityB = 0

    //       if (groupA && groupA.priority) {
    //         priorityA = groupA.priority
    //       }

    //       if (groupB && groupB.priority) {
    //         priorityB = groupB.priority
    //       }

    //       return priorityB - priorityA
    //     }).map(group => {
    //       group.messages.sort((messageA, messageB) => {
    //         return messageA.time - messageB.time
    //       })
    //     });

    //     this.filteredGroups = this.groups
    //     this.onSelectChat(this.selectedChat ? this.selectedChat : this.groups[0]);
    //   }
    // })

    this.groups = GROUPS;
    this.filteredGroups = this.groups;
    this.loadingService.loadingOff();
    this.onSelectChat(this.selectedChat ? this.selectedChat : this.groups[0]);
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

    // Filtrar grupos com base no nome ou na última mensagem (searchQuery)
    this.filteredGroups = this.groups.filter(group => {
      const matchesQuery = group.name.toLowerCase().includes(query) || 
                          (group.lastMessage?.toLowerCase() || '').includes(query);

      // Verifica se o grupo contém alguma das tags selecionadas
      const matchesTags = this.selectedTags.length === 0 || 
                          this.selectedTags.every(tag => group.tags?.includes(tag));

      // Retorna os grupos que correspondem à pesquisa e às tags selecionadas
      return matchesQuery && matchesTags;
    });
  }

  getTagColor(tagName: string): string {
    const tag = this.availableTags.find((t) => t.name === tagName);
    return tag ? tag.color : '#0aa82c'; // Retorna branco como padrão caso não encontre
  }
  
  // Referência à div de filtro
  @ViewChild('dropdownTags') dropdownTags!: ElementRef;

  toggleDropdownTags(event: Event): void {
    event.stopPropagation();
    this.showDropdownTags = !this.showDropdownTags;
  }

  toggleTagSelection(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
  if (index > -1) {
    this.selectedTags.splice(index, 1); // Remove tag se já estiver selecionada
  } else {
    this.selectedTags.push(tag); // Adiciona tag se ainda não estiver selecionada
  }

  // Atualiza a lista de grupos filtrados
  this.filterGroups();
  }

  // Fecha a div se clicar fora dela
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
      const clickedInside = this.dropdownTags?.nativeElement.contains(event.target);
      if (!clickedInside) {
          this.showDropdownTags = false;
      }
  }

  getPriorityColor(level: number): string {
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
