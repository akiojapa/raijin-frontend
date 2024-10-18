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
  faAnglesRight
} from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PAGES } from '../../helpers/pages';
import { IPages } from '../../interfaces/pages';
import { IGroup, IMessage } from '../../interfaces/groups';
import { GROUPS } from '../../helpers/groups';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-menu',
  imports: [FontAwesomeModule, HeaderComponent, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  animations: [
    // Animação para o menu lateral
    trigger('toggleSidebar', [
      state('expanded', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('collapsed', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('expanded <=> collapsed', [
        animate('0.3s ease-in-out')
      ])
    ]),
    // Animação para o menu horizontal
    trigger('toggleFooter', [
      state('expanded', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      state('collapsed', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      transition('expanded <=> collapsed', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
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
  faAnglesRight = faAnglesRight;
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
  isCollapsed: boolean = true;
  isFooterCollapsed: boolean = true;
  emojis: string[] = ['😀', '😂', '😍', '😎', '😢', '👍', '🎉', '❤️']; // Array de emojis


  constructor(private router: Router) { }

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


  toggleMenu() {
    // Primeiro fecha a sidebar e depois abre o footer
    if (this.isCollapsed) {
      this.isCollapsed = !this.isCollapsed;
      setTimeout(() => {
        this.isFooterCollapsed = !this.isFooterCollapsed;
      }, 200); // Define o tempo da animação da sidebar antes de abrir o footer
    } else {
      // Primeiro fecha o footer e depois abre a sidebar
      this.isFooterCollapsed = !this.isFooterCollapsed;
      setTimeout(() => {
        this.isCollapsed = !this.isCollapsed;
      }, 100); // Define o tempo da animação do footer antes de abrir a sidebar
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