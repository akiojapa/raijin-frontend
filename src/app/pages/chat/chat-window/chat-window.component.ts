import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquarePlus, IconDefinition, faTag } from '@fortawesome/free-solid-svg-icons';
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
  faTag: IconDefinition = faTag;
  showDropdownTags: boolean = false;
  availableTags: { name: string; color: string }[] = [
    { name: 'Tag 1', color: '#C70039' },
    { name: 'Tag 2', color: '#1842d0' },
    { name: 'Tag 3', color: '#c509db ' },
    { name: 'Tag 4', color: '#ea16b0' },
    { name: 'Tag 5', color: '#969398' }
  ];
  selectedTags: string[] = [];

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
  
  startGroups(){
    if (isPlatformBrowser(this.elementRef.nativeElement)) {
      return
    }
    
    this.loadingService.loadingOn()
    this.groups = GROUPS
    this.filteredGroups = this.groups
    this.onSelectChat(this.selectedChat ? this.selectedChat : this.groups[0]);
    this.loadingService.loadingOff()

    // this.chatService.getGroups(997732694).pipe(
    //   finalize(() => this.loadingService.loadingOff())
    // ).subscribe({
    //   next: (response) => {
    //     this.groups = response.body
    //     this.groups[0].messages = [this.groups[0].messages[0]] 
    //     this.filteredGroups = this.groups;
    //     this.onSelectChat(this.selectedChat ? this.selectedChat : this.groups[0]);
    //   }
    // })
  }

  connectWebSocket(){
    this.chatService.connectWebSocket()
    this.websocketSubscription = this.chatService.receiveMessage().subscribe({
      next: data => {
        const newMessage: IMessage = {
          sender: data['name'] ?? 'Externo',
          content: data.message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
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
    return tag ? tag.color : '#FFFFFF'; // Retorna branco como padrão caso não encontre
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
}
