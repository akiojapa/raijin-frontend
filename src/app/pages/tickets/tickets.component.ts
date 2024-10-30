import { CommonModule } from "@angular/common";
import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  selectedTicket: any;

  chamados = [
    { id: '#2357', titulo: 'Chat Teste', atendente: 'Caio', projeto: 'Projeto 1', data: '23/10/2024', descricao: 'Descrição teste', tipo: 'Tipo teste', subtipo: 'Subtipo teste', arquivos: 'Arquivos teste' },
    { id: '#1983', titulo: 'Chat Teste', atendente: 'Eduardo', projeto: 'Projeto 12', data: '23/10/2024', descricao: 'Descrição teste', tipo: 'Tipo teste', subtipo: 'Subtipo teste', arquivos: 'Arquivos teste' },
    { id: '#2327', titulo: 'Chat Teste', atendente: 'João', projeto: 'Projeto 49', data: '23/10/2024', descricao: 'Descrição teste', tipo: 'Tipo teste', subtipo: 'Subtipo teste', arquivos: 'Arquivos teste' },
];

  addTicketForm: FormGroup;
  updateTicketDescriptionForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.addTicketForm = this.fb.group({
      ticketProject: ['', Validators.required],
      ticketTitle: ['', Validators.required],
      ticketAttendant: ['', Validators.required],
      ticketDescription: ['', Validators.required],
      ticketType: ['', Validators.required],
      ticketSubtype: ['', Validators.required],
    });

    this.updateTicketDescriptionForm = this.fb.group({
      ticketDescription: ['', Validators.required],
    });
  }

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
        this.selectedTicket = chamado;
        this.showViewTicketDiv = true;
        break;
      case 'updateTicket':
        this.showViewTicketDiv = true;
        this.updateTicketDiv = true;
        this.selectedTicket = chamado;
        // Preenche o campo de descrição com o valor do chamado selecionado
        this.updateTicketDescriptionForm.patchValue({
            ticketDescription: chamado?.descricao,
        });
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

  addTicket() {
    const invalidFields = []; // Array para armazenar campos inválidos
  
    // Verifica quais campos obrigatórios estão inválidos
    if (!this.addTicketForm.get('ticketProject')?.valid) {
      invalidFields.push('Projeto');
    }
    if (!this.addTicketForm.get('ticketTitle')?.valid) {
      invalidFields.push('Título');
    }
    if (!this.addTicketForm.get('ticketAttendant')?.valid) {
      invalidFields.push('Atendente');
    }
    if (!this.addTicketForm.get('ticketDescription')?.valid) {
      invalidFields.push('Descrição');
    }
    if (!this.addTicketForm.get('ticketType')?.valid) {
      invalidFields.push('Tipo');
    }
    if (!this.addTicketForm.get('ticketSubtype')?.valid) {
      invalidFields.push('Subtipo');
    }
  
    // Se houver campos inválidos, exibe um alerta
    if (invalidFields.length > 0) {
      alert(`Os seguintes campos são obrigatórios e devem ser preenchidos: ${invalidFields.join(', ')}`);
      return; // Para sair da função se houver campos inválidos
    }
  
    // Se todos os campos obrigatórios estão preenchidos, prossegue
    const newTicket = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      projeto: this.addTicketForm.value.ticketProject,
      titulo: this.addTicketForm.value.ticketTitle,
      atendente: this.addTicketForm.value.ticketAttendant,
      data: new Date().toLocaleDateString(),
      descricao: this.addTicketForm.value.ticketDescription,
      tipo: this.addTicketForm.value.ticketType,
      subtipo: this.addTicketForm.value.ticketSubtype,
      arquivos: 'Nenhum arquivo anexado',
    };
  
    this.chamados.push(newTicket);
    this.manageDisplay('filter');
    this.addTicketForm.reset();
  }

  updateTicket() {
    if (this.updateTicketDescriptionForm.valid) {
      const updatedDescription = this.updateTicketDescriptionForm.value.ticketDescription;
      const ticketIndex = this.chamados.findIndex(ticket => ticket.id === this.selectedTicket.id);

      if (ticketIndex !== -1) {
        this.chamados[ticketIndex].descricao = updatedDescription;
        alert('Descrição do chamado atualizada com sucesso!');
        this.manageDisplay('filter'); // Volta para a visualização de todos os chamados
        this.updateTicketDescriptionForm.reset(); // Reseta o formulário de atualização
      }
    } else {
      alert('O campo descrição é obrigatório e deve ser preenchido.');
    }
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
