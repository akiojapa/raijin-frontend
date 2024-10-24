import { CommonModule } from "@angular/common";
import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { 
  faSquarePlus, faComment, faUser, faCog, 
  faAnglesLeft, faSignInAlt, faMagnifyingGlass, faCalendarDays, 
  faChevronDown, faTicket, faPlus, faDownload, faAnglesRight, 
  faArrowLeft, faPaperclip, faImage, faFile
} from "@fortawesome/free-solid-svg-icons";
import { HeaderComponent } from "../../components/header/header.component";
import { GROUPS } from "../../helpers/groups";
import { PAGES } from "../../helpers/pages";
import { IGroup } from "../../interfaces/groups";
import { IPages } from "../../interfaces/pages";
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [FontAwesomeModule, HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
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
  faAnglesLeft = faAnglesLeft;
  faSignOutAlt = faSignInAlt;
  faCalendarDays = faCalendarDays;
  faMagnifyingGlass = faMagnifyingGlass;
  faChevronDown = faChevronDown;
  faTicket = faTicket;
  faPlus = faPlus;
  faDownload = faDownload;
  faAnglesRight = faAnglesRight;
  faArrowLeft = faArrowLeft;
  faPaperclip = faPaperclip;
  faImage = faImage;
  faFile = faFile;

  choosenGroup: IGroup = this.groups[0];
  newMessageContent: string = '';

  showFilterTicketDiv = true;
  showAddTicketDiv = false;
  showViewTicketDiv = false;
  updateTicketDiv = false;
  showDropdownMenu: boolean = false;
  showDropdown: boolean = false;

  chamados = [
    { id: '#2357', titulo: 'Chat Teste', atendente: 'Caio', projeto: 'Projeto 1', data: '23/10/2024', descricao: 'Descrição teste', tipo: 'Tipo teste', subtipo: 'Subtipo teste', arquivos: 'Arquivos teste' },
    { id: '#1983', titulo: 'Chat Teste', atendente: 'Eduardo', projeto: 'Projeto 12', data: '23/10/2024', descricao: 'Descrição teste', tipo: 'Tipo teste', subtipo: 'Subtipo teste', arquivos: 'Arquivos teste' },
    { id: '#2327', titulo: 'Chat Teste', atendente: 'João', projeto: 'Projeto 49', data: '23/10/2024', descricao: 'Descrição teste', tipo: 'Tipo teste', subtipo: 'Subtipo teste', arquivos: 'Arquivos teste' },
    { id: '#4782', titulo: 'Chat Teste', atendente: 'Renan', projeto: 'Projeto 9', data: '23/10/2024', descricao: 'Descrição teste', tipo: 'Tipo teste', subtipo: 'Subtipo teste', arquivos: 'Arquivos teste' },
    { id: '#1209', titulo: 'Chat Teste', atendente: 'Gustavo', projeto: 'Projeto 3', data: '23/10/2024', descricao: 'Descrição teste', tipo: 'Tipo teste', subtipo: 'Subtipo teste', arquivos: 'Arquivos teste' },
    { id: '#1398', titulo: 'Chat Teste', atendente: 'Felipe', projeto: 'Projeto 5', data: '23/10/2024', descricao: 'Descrição teste', tipo: 'Tipo teste', subtipo: 'Subtipo teste', arquivos: 'Arquivos teste' },
    { id: '#1367', titulo: 'Chat Teste', atendente: 'Lucas', projeto: 'Projeto 2', data: '23/10/2024', descricao: 'Descrição teste', tipo: 'Tipo teste', subtipo: 'Subtipo teste', arquivos: 'Arquivos teste' },
    { id: '#4938', titulo: 'Chat Teste', atendente: 'Pedro', projeto: 'Projeto 82', data: '23/10/2024', descricao: 'Descrição teste', tipo: 'Tipo teste', subtipo: 'Subtipo teste', arquivos: 'Arquivos teste' },
  ];

  selectedTicket: any;

  constructor(private fb: FormBuilder, private router: Router) {}

  manageDisplay(view: string, chamado?: any) {
    this.showFilterTicketDiv = false;
    this.showAddTicketDiv = false;
    this.showViewTicketDiv = false;
    this.updateTicketDiv = false;

    switch (view) {
      case 'addTicket':
        this.showAddTicketDiv = true;
        break;
      case 'viewTicket':
        this.showViewTicketDiv = true;
        this.selectedTicket = chamado;
        break;
      case 'updateTicket':
        this.updateTicketDiv = true;
        this.newMessageContent = `Detalhes do chamado: ${chamado?.titulo}`;
        break;
      default:
        this.showFilterTicketDiv = true;
        break;
    }
  }

  toggleAddTicketDiv() {
    this.showAddTicketDiv = !this.showAddTicketDiv;
    this.showFilterTicketDiv = !this.showFilterTicketDiv;
    this.showViewTicketDiv = false; 
  }

  toggleViewTicketDiv() {
    this.showViewTicketDiv = !this.showViewTicketDiv;
    this.showFilterTicketDiv = !this.showFilterTicketDiv; 
    this.showAddTicketDiv = false; 
  }

  toggleDropdownMenu(event: Event) {
    this.showDropdownMenu = !this.showDropdownMenu;
    this.showDropdown = false;
    event.stopPropagation(); 
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    this.showDropdownMenu = false;
  }

  toggleDropdown() {    
    this.showDropdown = !this.showDropdown;
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
