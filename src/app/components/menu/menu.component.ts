import { AfterViewChecked, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSquarePlus, faComment, faUser, faCog, faAnglesLeft,
  faSignInAlt, faSmile, faPaperPlane,
  faImage,
  faFile,
  faVideo,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PAGES } from '../../helpers/pages';
import { IPages } from '../../interfaces/pages';
import { IGroup, IMessage } from '../../interfaces/groups';
import { GROUPS } from '../../helpers/groups';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/webhook.service';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-menu',
  imports: [FontAwesomeModule, HeaderComponent, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true
})
export class MenuComponent implements AfterViewChecked, OnInit, OnDestroy{
  @ViewChild('messagesContainer')
  private messagesContainer!: ElementRef;
  @ViewChild('imageInput')
  imageInput!: ElementRef;
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  pages: IPages[] = PAGES;
  groups: IGroup[] = GROUPS;

  faSquarePlus = faSquarePlus;
  faComment = faComment;
  faUser = faUser;
  faCog = faCog;
  faSmile = faSmile;
  faPaperPlane = faPaperPlane
  faAnglesLeft = faAnglesLeft;
  faSignOutAlt = faSignInAlt;
  faPlus = faSquarePlus;
  faImage = faImage;
  faFile = faFile;
  faVideo = faVideo;
  faEllipsisV = faEllipsisV;
  choosenGroup: IGroup = this.groups[0];
  newMessageContent: string = '';
  showDropdownMenu: boolean = false;
  showEmojiPicker: boolean = false;
  showDropdown: boolean = false;
  emojis: string[] = ['😀', '😂', '😍', '😎', '😢', '👍', '🎉', '❤️']; // Array de emojis
  websocketSubscription!: Subscription


  constructor(
    private router: Router,
    private websocketService: WebSocketService
  ) { }

  ngOnInit(): void {
    const websocketUrl = 'ws://127.0.0.1:8000/ws/chat/lobby'; // Isso pode vir de uma variável, rota, ou backend

    // Conectando ao WebSocket com a URL dinâmica
    this.websocketService.connect(websocketUrl);

    // Inscrevendo-se para receber mensagens do WebSocket
    this.websocketSubscription = this.websocketService.onMessage().subscribe({
      next: msg => {
        const newMessage: IMessage = {
          sender: 'Externo',
          content: msg.message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        this.choosenGroup.messages.push(newMessage); // Armazena as mensagens recebidas
        console.log('Received message: ', msg); // Exibe no console a mensagem
        console.log(newMessage); // Exibe no console a mensagem
      },
      error: error => console.error('WebSocket error:', error) // Tratamento de erro
    });
  }

  ngOnDestroy(): void {
    // Desinscrevendo-se do Observable quando o componente é destruído
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
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

  isSelected(page: any): boolean {
    console.log(this.router.url);
    return this.router.url.includes(page.path);
  }

  navigateTo(path: string) {
    console.log(path)
    this.router.navigate([path]);
  } 

  sendMessage(): void {
    if (this.newMessageContent.trim()) {
      const newMessage: IMessage = {
        sender: 'Usuário',
        content: this.newMessageContent,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      this.websocketService.sendMessage({
          'message': newMessage.content
      });
      this.choosenGroup.messages.push(newMessage);
      this.newMessageContent = '';
    }
  }

  openGroupInfo() {
    console.log('Abrindo informações do grupo');
  }

  muteGroup() {
    console.log('Silenciando grupo');
  }

  openCall() {
    console.log('Abrindo chamado');
  }

  exitGroup() {
    console.log('Saindo do grupo');
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
}