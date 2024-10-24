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

  // Controle de visibilidade das divs
  showFilterTicketDiv = true;
  showAddTicketDiv = false;
  showViewTicketDiv = false; // Nova propriedade para visualizar tickets
  updateTicketDiv = false;
  showDropdownMenu: boolean = false;
  showDropdown: boolean = false;

  // Chamados e chamado selecionado para visualização
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

  selectedTicket: any; // Para armazenar o chamado selecionado

  constructor(private fb: FormBuilder, private router: Router) {}

  toggleAddTicketDiv() {
    this.showAddTicketDiv = !this.showAddTicketDiv;
    this.showFilterTicketDiv = !this.showFilterTicketDiv;
    this.showViewTicketDiv = false; // Esconder a visualização ao abrir um chamado
  }

  toggleViewTicketDiv() {
    this.showViewTicketDiv = !this.showViewTicketDiv;
    this.showFilterTicketDiv = !this.showFilterTicketDiv; // Esconder o filtro ao visualizar um chamado
    this.showAddTicketDiv = false; // Esconder a abertura de chamado ao visualizar
  }

  // Método para visualizar um chamado
  viewTicket(chamado: any) {
    this.selectedTicket = chamado; // Armazena o chamado selecionado
    this.toggleViewTicketDiv(); // Alterna para a visualização do chamado
  }

  toggleUpdateTicketDiv(chamado: any) {
    this.showFilterTicketDiv = !this.showFilterTicketDiv;
    this.showAddTicketDiv = !this.showAddTicketDiv;
    this.updateTicketDiv = !this.updateTicketDiv;
    this.newMessageContent = `Detalhes do chamado: ${chamado.titulo}`;
  }

  toggleDropdownMenu(event: Event) {
    this.showDropdownMenu = !this.showDropdownMenu;
    this.showDropdown = false;
    event.stopPropagation(); // Evita que o clique no ícone feche o dropdown
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    this.showDropdownMenu = false;
  }

  toggleDropdown() {    
    this.showDropdown = !this.showDropdown;
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
