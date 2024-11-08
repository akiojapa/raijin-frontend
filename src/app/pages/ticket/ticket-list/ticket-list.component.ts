import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {  MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTicket, faPlus, faDownload, faAnglesLeft, faAnglesRight, faArrowLeft, faPaperclip, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { TICKETS } from '../../../helpers/tickets';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    FontAwesomeModule, ReactiveFormsModule, 
    CommonModule, FormsModule, MatPaginatorModule, MatTableModule 
  ],
  templateUrl: './ticket-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('imageInput') imageInput!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  faChevronDown = faChevronDown;
  faTicket = faTicket;
  faPlus = faPlus;
  faDownload = faDownload;
  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faArrowLeft = faArrowLeft;
  faPaperclip = faPaperclip;

  showFilterTicketDiv = true;
  showAddTicketDiv = false;
  showViewTicketDiv = false;
  updateTicketDiv = false;
  showDropdownMenu: boolean = false;
  showDropdown: boolean = false;
  selectedTicket: any;

  tickets: any = TICKETS;
  dataSource?: any;
  displayedColumns: string[] = ['id', 'titulo', 'atendente', 'projeto'];

  addTicketForm: FormGroup;
  updateTicketDescriptionForm: FormGroup;

  constructor(private fb: FormBuilder, private toastService: ToastrService, private cdr: ChangeDetectorRef) {
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

  ngAfterViewInit() {

    this.dataSource = new MatTableDataSource(this.tickets);

    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
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
    const invalidFields = [];
  
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
  
    if (invalidFields.length > 0) {
      this.toastService.warning(`Os seguintes campos são obrigatórios e devem ser preenchidos: ${invalidFields.join(', ')}`);
      this.manageDisplay('filter');
      this.addTicketForm.reset();
      return
    }
  
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
  
    this.tickets.push(newTicket);
    this.manageDisplay('filter');
    this.addTicketForm.reset();
  }

  updateTicket() {
    if (this.updateTicketDescriptionForm.valid) {
      const updatedDescription = this.updateTicketDescriptionForm.value.ticketDescription;
      const ticketIndex = this.tickets.findIndex((ticket: { id: any; }) => ticket.id === this.selectedTicket.id);

      if (ticketIndex !== -1) {
        this.tickets[ticketIndex].descricao = updatedDescription;
        this.toastService.success('Descrição do chamado atualizada com sucesso!');
        this.manageDisplay('filter');
        this.updateTicketDescriptionForm.reset();
      }
    } else {
      this.toastService.warning('O campo descrição é obrigatório e deve ser preenchido.');
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