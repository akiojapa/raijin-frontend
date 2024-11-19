import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { faCog, faComment, faEllipsisV, faFile, faImage, faPaperPlane, faSmile, faSquarePlus, faUser, faVideo } from '@fortawesome/free-solid-svg-icons';
import { IGroup, IMessage } from '../../../interfaces/groups';
import { GROUPS } from '../../../helpers/groups';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChatService } from '../../../services/chat.service';
import { type } from 'os';
import { group } from 'console';
import { ToastrService } from 'ngx-toastr';

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
  faSmile = faSmile;
  faPaperPlane = faPaperPlane
  emojis: string[] = ['😀', '😂', '😍', '😎', '😢', '👍', '🎉', '❤️']; // Array de emojis

  showTagDropdown = false;
  availableTags: { name: string; color: string }[] = [
    { name: 'Tag 1', color: '#C70039' },
    { name: 'Tag 2', color: '#1842d0' },
    { name: 'Tag 3', color: '#c509db' },
    { name: 'Tag 4', color: '#ea16b0' },
    { name: 'Tag 5', color: '#969398' }
  ];
  selectedGroupTags: string[] = []; // Tags do grupo selecionado
  creatingNewTag = false; // Define se está no modo de criação de nova tag
  newTagName: string = ''; // Nome da nova tag
  newTagColor: string = '#44FFFF'; // Cor da nova tag (hexadecimal)

  constructor(
    private chatService: ChatService,
    private toastService: ToastrService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.chatService.selectedGroupChat$.subscribe((group) => {
      if (group !== null) {
        this.choosenGroup = group; // Função para carregar dados do grupo
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

  getTagColor(tagName: string): string {
    const tag = this.availableTags.find((t) => t.name === tagName);
    return tag ? tag.color : '#FFFFFF'; // Retorna branco como padrão caso não encontre
  }
  

  toggleDropdownMenu(event: Event) {
    this.showDropdownMenu = !this.showDropdownMenu;
    this.showDropdown = false
    this.showEmojiPicker = false;
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-menu-manager') && !target.closest('.dropdown-tags-manager')) {
      this.showDropdownMenu = false;
      this.showTagDropdown = false;
    }
  }

  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-menu-manager')) {
      this.showDropdownMenu = false;
      this.showTagDropdown = false;
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

  toggleTagDropdown(event: Event): void {
    event.stopPropagation();
    this.showDropdownMenu = false; // Oculta o menu de opções do grupo
    this.showTagDropdown = !this.showTagDropdown;

    // Initialize selectedGroupTags based on the current group's tags
    if (this.showTagDropdown && this.choosenGroup.tags) {
      this.selectedGroupTags = [...this.choosenGroup.tags];
    }
  }

  toggleTag(tagName: string): void {
    const index = this.selectedGroupTags.indexOf(tagName);
    if (index > -1) {
      this.selectedGroupTags.splice(index, 1); // Remove a tag se estiver selecionada
    } else {
      this.selectedGroupTags.push(tagName); // Adiciona a tag se não estiver selecionada
    }
  }

  // Método de exemplo para salvar as tags no grupo selecionado (chamado ao fechar o dropdown, por exemplo)
  saveTagsToGroup(): void {
    if (this.choosenGroup) {
      this.choosenGroup.tags = [...this.selectedGroupTags];
    }
    this.showTagDropdown = false; // Fecha o dropdown após salvar
  }

  // Função para abrir o modo de criação de tag
  openTagCreation(): void {
    this.creatingNewTag = true;
  }

  // Função para cancelar a criação de uma nova tag
  cancelTagCreation(): void {
    this.creatingNewTag = false;
    this.newTagName = '';
    this.newTagColor = '#000000';
  }
  
  addNewTag(): void {
    if (this.newTagName && this.newTagColor) {
      // Adiciona a nova tag ao array de tags disponíveis
      this.availableTags.push({ name: this.newTagName, color: this.newTagColor });
  
      // Exibe o toast (ajuste este método para o seu toast existente)
      this.toastService.success('Tag criada com sucesso!');
  
      // Reseta os campos
      this.newTagName = '';
      this.newTagColor = '#000000';
      this.creatingNewTag = false;
    }
  }

}
