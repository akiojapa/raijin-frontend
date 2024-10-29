import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquarePlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IGroup } from '../../../interfaces/groups';
import { GROUPS } from '../../../helpers/groups';
import { ChatService } from '../../../services/chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent {
  groups: IGroup[] = GROUPS;

  filteredGroups: any[] = [];
  searchQuery: string = '';
  faSquarePlus: IconDefinition = faSquarePlus;

  selectedChat: IGroup | null = null;

  constructor(private chatService: ChatService) {}

  onSelectChat(chatGroup: IGroup) {
    this.selectedChat = chatGroup;
    this.chatService.selectChat(chatGroup);
  }

  lastMessage(group: IGroup) {
    return group.messages[group.messages.length - 1].content;
  }

  ngOnInit() {
    this.filteredGroups = this.groups;
    this.chatService.selectedGroupChat$.subscribe(group => {
      this.selectedChat = group;
    });
    this.onSelectChat(this.selectedChat ? this.selectedChat : this.groups[0]);
  }
  
  filterGroups() {
    const query = this.searchQuery.toLowerCase();
    this.filteredGroups = this.groups.filter(group =>
      group.name.toLowerCase().includes(query) ||
      group.lastMessage.toLowerCase().includes(query)
    );
  }
}
