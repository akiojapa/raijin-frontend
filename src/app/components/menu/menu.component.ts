import { AfterViewChecked, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-menu',
  imports: [FontAwesomeModule, HeaderComponent, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true
})
export class MenuComponent implements AfterViewChecked {
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


  constructor(private router: Router) { }

  chooseGroup(group: IGroup): void {
    this.choosenGroup = group;
  }

  ngAfterViewChecked() {
    this.scrollToBottom(); // Garante que o scroll esteja sempre no fim ao carregar a view
  }

  // Método para rolar para o fim do container de mensagens
  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Erro ao tentar rolar para o fim:', err);
    }
  }

  // Verifica se a página está selecionada com base na URL atual
  isSelected(page: any): boolean {
    console.log(this.router.url);
    return this.router.url.includes(page.path);
  }

  // Navega para a rota clicada
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
      this.choosenGroup.messages.push(newMessage);
      this.newMessageContent = '';
    }
  }

  openGroupInfo() {
    console.log('Abrindo informações do grupo');
    // Lógica para abrir informações do grupo
  }

  muteGroup() {
    console.log('Silenciando grupo');
    // Lógica para silenciar o grupo
  }

  openCall() {
    console.log('Abrindo chamado');
    // Lógica para abrir um chamado
  }

  exitGroup() {
    console.log('Saindo do grupo');
    // Lógica para sair do grupo
  }

  toggleDropdownMenu(event: Event) {
    this.showDropdownMenu = !this.showDropdownMenu;
    this.showDropdown = false
    this.showEmojiPicker = false;
    event.stopPropagation(); // Evita que o clique no ícone feche o dropdown
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    this.showDropdownMenu = false;
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    this.showDropdown = false; // Fecha o dropdown ao abrir o emoji picker
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    this.showEmojiPicker = false; // Fecha o emoji picker ao abrir o dropdown
  }

  // Adiciona o emoji à mensagem
  addEmoji(emoji: string) {
    this.newMessageContent += emoji; // Adiciona o emoji ao campo de mensagem
    this.showEmojiPicker = false; // Fecha o seletor de emojis após selecionar
  }

  // Dispara o campo de seleção de arquivo
  triggerFileInput(type: string) {
    if (type === 'image') {
      this.imageInput.nativeElement.click();
    } else if (type === 'file') {
      this.fileInput.nativeElement.click();
    }
  }

  // Lida com a seleção de arquivo
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

  // Lógica para upload de imagem
  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    
    // Exemplo de upload (substituir com sua lógica de envio para o backend)
    console.log('Uploading image:', file.name);
    // Enviar o formData para o servidor
  }

  // Lógica para upload de arquivo genérico
  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Exemplo de upload (substituir com sua lógica de envio para o backend)
    console.log('Uploading file:', file.name);
    // Enviar o formData para o servidor
  }
}