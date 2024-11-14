import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { faCheckCircle, faCircle, faClipboardList, faCog, faComment, faEllipsisV, faFile, faImage, faPaperPlane, faSmile, faSquarePlus, faUser, faVideo } from '@fortawesome/free-solid-svg-icons';
import { IGroup, IMessage } from '../../../interfaces/groups';
import { GROUPS } from '../../../helpers/groups';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChatService } from '../../../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})

export class ChatListComponent implements OnInit {
  @ViewChild('messagesContainer')
  private messagesContainer!: ElementRef;
  @ViewChild('imageInput')
  imageInput!: ElementRef;
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  groups: IGroup[] = GROUPS;
  faImage = faImage;
  faFile = faFile;
  faVideo = faVideo;
  faPlus = faSquarePlus;
  faEllipsisV = faEllipsisV;
  choosenGroup: IGroup = this.groups[0];
  newMessageContent: string = '';
  showDropdownMenu: boolean = false;
  showEmojiPicker: boolean = false;
  showDropdown: boolean = false;
  faSquarePlus = faSquarePlus;
  faComment = faComment;
  faUser = faUser;
  faCog = faCog;
  faCheckCircle = faCheckCircle;
  faCircle = faCircle;
  faSmile = faSmile;
  faPaperPlane = faPaperPlane
  faTicketManager = faClipboardList

  selectTicketMode: boolean = false;
  selectedMessages: IMessage[] = [];


  emojis: string[] = ['😀', '😂', '😍', '😎', '😢', '👍', '🎉', '❤️']; // Array de emojis

  constructor(
    private chatService: ChatService,
    private route: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.chatService.selectedGroupChat$.subscribe((group) => {
      if (group !== null) {
        this.choosenGroup = group;
      }
    });
  }


  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    this.showDropdown = false;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    this.showEmojiPicker = false;
  }

  addEmoji(emoji: string) {
    this.newMessageContent += emoji;
    this.showEmojiPicker = false;
  }

  triggerFileInput(type: string) {
    if (type === 'image') {
      this.imageInput.nativeElement.click();
    } else if (type === 'file') {
      this.fileInput.nativeElement.click();
    }
  }

  handleFileInput(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      if (type === 'image') {
        this.uploadImage(file);
      } else if (type === 'file') {
        this.uploadFile(file);
      }
    }
  }

  sendMessagesForTicket() {
  const messagesJson = JSON.stringify(this.selectedMessages);

  localStorage.setItem('selectedMessages', messagesJson);

  this.route.navigate(['/menu/ticket']);
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    console.log('Uploading image:', file.name);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    console.log('Uploading file:', file.name);
  }

  sendMessage(): void {
    if (this.newMessageContent.trim()) {
      const newMessage: IMessage = {
        sender: 'Usuário',
        content: this.newMessageContent,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const url = this.document.location.hostname
      const domains = url.split('.')
      const companyName = domains.length > 1 ? `${domains[0]}` : ''

      this.chatService.sendMessage(
        this.choosenGroup.whats_id,
        newMessage.content,
        companyName
      )

      this.choosenGroup.messages.push(newMessage);
      this.newMessageContent = '';
    }
  }

  toggleDropdownMenu(event: Event) {
    this.showDropdownMenu = !this.showDropdownMenu;
    this.showDropdown = false
    this.showEmojiPicker = false;
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    this.showDropdownMenu = false;
  }


  openGroupInfo() {
    console.log('Abrindo informações do grupo');
  }

  muteGroup() {
    console.log('Silenciando grupo');
  }

  toggleSelectMode() {
    this.selectTicketMode = !this.selectTicketMode;
    localStorage.removeItem('selectedMessages');
    this.selectedMessages = [];
  }

  toggleMessageSelection(message: IMessage) {
    const pos = this.selectedMessages.indexOf(message);

    if (pos > -1) {
      this.selectedMessages.splice(pos, 1);
    } else {
      this.selectedMessages.push(message);
    }

    if (this.selectedMessages.length > 0) {
      this.chatService.openTicketMessage(true);
    } else {
      this.chatService.openTicketMessage(false);
    }
  }

  cancelSelection() {
    this.selectTicketMode = false;
    this.selectedMessages = [];
  }

  confirmSelection() {
    this.cancelSelection();
  }
    

  exitGroup() {
    console.log('Saindo do grupo');
  }
  chooseGroup(group: IGroup): void {
    this.choosenGroup = group;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Erro ao tentar rolar para o fim:', err);
    }
  }

}
