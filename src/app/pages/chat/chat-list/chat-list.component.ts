import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { faCheckCircle, faCircle, faClipboardList, faCog, faComment, faEllipsisV, faEllipsisVertical, faFile, faImage, faPaperPlane, faSmile, faSquarePlus, faUser, faVideo, faX, faPen } from '@fortawesome/free-solid-svg-icons';
import { Group, IMessage, Message } from '../../../interfaces/groups';
import { GROUPS } from '../../../helpers/groups';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChatService } from '../../../services/chat.service';
import { Router } from '@angular/router';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../services/auth.service';
import { type } from 'os';
import { group } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, FormsModule, MatTooltipModule, MatTooltip],
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
  groups: Group[] = GROUPS;
  faImage = faImage;
  faFile = faFile;
  faVideo = faVideo;
  faPlus = faSquarePlus;
  faEllipsisV = faEllipsisV;
  choosenGroup: Group = this.groups[0];
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
  faPen = faPen;
  faSmile = faSmile;
  faPaperPlane = faPaperPlane;
  faTicketManager = faClipboardList;
  faX = faX;

  selectTicketMode: boolean = false;
  selectedMessages: IMessage[] = [];


  emojis: string[] = ['😀', '😂', '😍', '😎', '😢', '👍', '🎉', '❤️']; // Array de emojis
  userName!: string;

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
  editingTag = false; // Adicionando uma variável para controlar a edição
  newTagName: string = ''; // Nome da nova tag
  newTagColor: string = '#0aa82c'; // Cor da nova tag (hexadecimal)
  tagToEdit: { name: string, color: string } | null = null; // Tag a ser editada

  constructor(
    private chatService: ChatService,
    private route: Router,
    private authService: AuthService,
    private toastService: ToastrService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    if (localStorage) {
      localStorage.removeItem('selectedMessages');
    }
    this.chatService.openTicketMessage(false);
    this.selectedMessages = [];

    this.userName = this.authService.getName()
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
      const date = new Date()

      const newMessage = new Message(
        {
          sender: this.userName,
          content: this.newMessageContent,
          time: date.getTime() / 1000
        }
      )

      const url = this.document.location.hostname
      const domains = url.split('.')
      const companyName = domains.length > 1 ? `${domains[0]}` : ''

      this.chatService.sendMessage(
        newMessage,
        this.authService.getPhoneNumber(),
        this.choosenGroup.whats_id,
        companyName,
      )
      this.choosenGroup.priority = 0
      this.choosenGroup.messages.push(newMessage);
      this.newMessageContent = '';
    }
  }

  getTagColor(tagName: string): string {
    const tag = this.availableTags.find((t) => t.name === tagName);
    return tag ? tag.color : '#0aa82c'; // Retorna branco como padrão caso não encontre
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

    // Verifica se o clique foi fora do menu de tags ou menu de opções
    if (!target.closest('.dropdown-menu-manager') && !target.closest('.dropdown-tags-manager')) {
      this.showDropdownMenu = false;
      this.showTagDropdown = false;

      // Reseta as variáveis associadas ao gerenciamento de tags
      this.creatingNewTag = false;
      this.editingTag = false;
      this.newTagName = '';
      this.newTagColor = '#0aa82c';
      this.tagToEdit = null;
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

  toggleSelectMode() {
    this.selectTicketMode = !this.selectTicketMode;
    localStorage.removeItem('selectedMessages');
    this.chatService.openTicketMessage(false);
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
  chooseGroup(group: Group): void {
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
      // Atualiza as tags do grupo com as tags selecionadas
      this.choosenGroup.tags = [...this.selectedGroupTags];
      this.toastService.success('Tags do grupo atualizadas com sucesso!');
    }
    
    // Fecha o dropdown após salvar
    this.showTagDropdown = false; 
  }

  // Função para abrir o modo de criação de tag
  openTagCreation(): void {
    this.creatingNewTag = true;
    this.editingTag = false; // Garante que estamos no modo de criação
    this.newTagName = '';
    this.newTagColor = '#0aa82c'; // Cor padrão
  }

  // Função para cancelar a criação de uma nova tag
  cancelTagCreation(): void {
    this.creatingNewTag = false;
    this.editingTag = false;
    this.newTagName = '';
    this.newTagColor = '#0aa82c';
  }
  
  addNewTag(): void {
    if (this.newTagName && this.newTagColor) {
      if (this.editingTag && this.tagToEdit) {
        // Edita uma tag existente
        const tagIndex = this.availableTags.findIndex(tag => tag.name === this.tagToEdit?.name);
        if (tagIndex !== -1) {
          this.availableTags[tagIndex] = { name: this.newTagName, color: this.newTagColor };
          this.toastService.success('Tag atualizada com sucesso!');          
          
          // Atualiza as tags do grupo sem perder a seleção
          this.updateGroupTags();
        }
      } else {
        // Cria uma nova tag
        const existingTagIndex = this.availableTags.findIndex(tag => tag.name === this.newTagName);
        if (existingTagIndex === -1) {
          this.availableTags.push({ name: this.newTagName, color: this.newTagColor });
          this.toastService.success('Tag criada com sucesso!');
        } else {
          this.toastService.error('Uma tag com esse nome já existe!');
        }
      }
  
      // Reseta os campos e volta ao estado inicial
      this.newTagName = '';
      this.newTagColor = '#0aa82c';
      this.creatingNewTag = false;
      this.editingTag = false; // Reseta o estado de edição
      this.tagToEdit = null;  // Limpa a tag editada
    }
  }

  openTagEdit(tag: { name: string, color: string }): void {
    this.creatingNewTag = true;
    this.editingTag = true; // Ativa o modo de edição
    this.tagToEdit = tag;
    this.newTagName = tag.name;
    this.newTagColor = tag.color;
  }

  editTag(tag: { name: string, color: string }): void {
    this.creatingNewTag = true; // Ativa a criação de uma nova tag, mas com dados já existentes
    this.newTagName = tag.name; // Preenche o nome da tag a ser editada
    this.newTagColor = tag.color; // Preenche a cor da tag a ser editada
  }

  updateGroupTags(): void {
    if (this.choosenGroup && this.choosenGroup.tags && this.tagToEdit) {
      // Verifica se a tag editada está nas tags do grupo
      const index = this.choosenGroup.tags.indexOf(this.tagToEdit.name);
      if (index !== -1) {
        // Substitui a tag antiga pela nova no grupo
        this.choosenGroup.tags[index] = this.newTagName;        
        
        // Agora, mantemos a tag editada selecionada
        this.selectedGroupTags = [...this.choosenGroup.tags];
      } else {
      }
    }
  }
  
}
