import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {  MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTicket, faPlus, faDownload, faAnglesLeft, faAnglesRight, faArrowLeft, faPaperclip, faChevronDown, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { TICKETS } from '../../../helpers/tickets';
import { IMessage } from '../../../interfaces/groups';
import { LoadingService } from '../../../services/loading.service';
import { ConfigService } from '../../../services/config.service';

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
export class TicketListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild('imageInput') imageInput!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  paginator!: MatPaginator;

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

  faCheckCircle: any = faCheckCircle;
  faTimesCircle: any = faTimesCircle;

  tickets: any[] = [];
  ticketMessages?: string;
  dataSource?: any;
  displayedColumns: string[] = ['id', 'titulo', 'atendente', 'projeto', 'sincronizado'];

  addTicketForm: FormGroup;
  updateTicketDescriptionForm: FormGroup;

  constructor(private fb: FormBuilder, private toastService: ToastrService, private cdr: ChangeDetectorRef, private loadingService: LoadingService, private http: ConfigService) {
    this.addTicketForm = this.fb.group({
      ticketProject: ['', Validators.required],
      ticketTitle: ['', Validators.required],
      ticketAttendant: ['', Validators.required],
      ticketDescription: ['', Validators.required],
      ticketType: ['', Validators.required],
      ticketSubtype: ['', Validators.required],
      ticketFiles: [''],
      ticketId: [''],
      ticketDate: [''],
    });

    this.updateTicketDescriptionForm = this.fb.group({
      ticketDescription: ['', Validators.required],
    });
  }
  
  ngOnInit() {
    // this.loadingService.loadingOn();
    // this.http.get('tickets').subscribe({
    //   next: (response) => {
    //     const data = response.body; 
    //     this.tickets = data.map((ticket: { id: string; title: string; assigned_to: string; description: string; liveSeo_sync: boolean; }) => ({
    //       id: ticket.id,              
    //       titulo: ticket.title,         
    //       atendente: ticket.assigned_to, 
    //       projeto: 'LiveSeo',          
    //       data: '23/10/2024',         
    //       descricao: ticket.description, 
    //       tipo: 'Tipo teste',         
    //       subtipo: 'Subtipo teste',    
    //       arquivos: 'Arquivos teste',   
    //       sincronizado: ticket.liveSeo_sync 
    //     }));
    //     this.dataSource = new MatTableDataSource(this.tickets); 
    //     this.dataSource.paginator = this.paginator;
    //     console.log('Dados carregados com sucesso:', this.tickets);
    //   },
    //   error: (error) => {
    //     console.error('Erro ao buscar os dados da API:', error);
    //   },
    //   complete: () => {
    //     this.loadingService.loadingOff(); 
    //     this.cdr.detectChanges(); 
    //   }
    // });
  }

  async ngAfterViewInit() {
    this.loadingService.loadingOn();
    if (this.hasMessages()) {
      const messages = await JSON.parse(localStorage.getItem('selectedMessages') || '{}');
       this.addTicketForm.patchValue({
        ticketDescription: this.formatMessagesForDescription(messages)
      });
      this.loadingService.loadingOff();
      this.toggleAddTicketDiv();
    }
    this.http.get('tickets').subscribe({
      next: (response) => {
        const data = response.body; 
        this.tickets = data.map((ticket: { id: string; title: string; assigned_to: string; description: string; liveSeo_sync: boolean; }) => ({
          id: ticket.id,              
          titulo: ticket.title,         
          atendente: ticket.assigned_to, 
          projeto: 'LiveSeo',          
          data: '23/10/2024',         
          descricao: ticket.description, 
          tipo: 'Tipo teste',         
          subtipo: 'Subtipo teste',    
          arquivos: 'Arquivos teste',   
          sincronizado: ticket.liveSeo_sync 
        }));
        this.dataSource = new MatTableDataSource(this.tickets); 
        this.dataSource.paginator = this.paginator;
        console.log('Dados carregados com sucesso:', this.tickets);
      },
      error: (error) => {
        console.error('Erro ao buscar os dados da API:', error);
      },
      complete: () => {
        this.loadingService.loadingOff(); 
        this.cdr.detectChanges(); 
      }
    });
  }

  hasMessages() {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('selectedMessages');
    }
    return null;
  }

  formatMessagesForDescription(messages: IMessage[]) {
    return messages.map((message: IMessage) => {
      return `${message.sender} relatou: ${message.content} - às ${message.time}`;
    }).join('\n');
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
    if(this.showAddTicketDiv) {
      this.addTicketForm.reset();
      localStorage.removeItem('selectedMessages');  
    }
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
      alert(`Os seguintes campos são obrigatórios e devem ser preenchidos: ${invalidFields.join(', ')}`);
      return; 
    }
  
    const newTicket = {
      title: this.addTicketForm.value.ticketTitle,
      created_by: this.addTicketForm.value.ticketAttendant,
      assigned_to: this.addTicketForm.value.ticketAttendant,
      description: this.addTicketForm.value.ticketDescription,
    };

    this.http.post('tickets', newTicket).subscribe({
      next: (response) => {
        console.log('Chamado criado com sucesso:', response);
        alert('Chamado criado com sucesso!');
        this.manageDisplay('filter');
        this.addTicketForm.reset();
      },
      error: (error) => {
        console.error('Erro ao criar chamado:', error);
        alert('Erro ao criar chamado. Verifique os detalhes no console.');
      },
      complete: () => {
        this.loadingService.loadingOn();
        this.http.get('tickets').subscribe({
          next: (response) => {
            const data = response.body; 
            this.tickets = data.map((ticket: { id: string; title: string; assigned_to: string; description: string; liveSeo_sync: boolean; }) => ({
              id: ticket.id,              
              titulo: ticket.title,         
              atendente: ticket.assigned_to, 
              projeto: 'LiveSeo',          
              data: '23/10/2024',         
              descricao: ticket.description, 
              tipo: 'Tipo teste',         
              subtipo: 'Subtipo teste',    
              arquivos: 'Arquivos teste',   
              sincronizado: ticket.liveSeo_sync 
            }));
            this.dataSource = new MatTableDataSource(this.tickets); 
            this.dataSource.paginator = this.paginator;
            console.log('Dados carregados com sucesso:', this.tickets);
          },
          error: (error) => {
            console.error('Erro ao buscar os dados da API:', error);
          },
          complete: () => {
            this.loadingService.loadingOff(); 
            this.cdr.detectChanges(); 
          }
        });
        console.log('Requisição concluída.');
      }
    });
    
  }

  updateTicket() {
    if (this.updateTicketDescriptionForm.valid) {
      const updatedDescription = this.updateTicketDescriptionForm.value.ticketDescription;
  
      const ticketIndex = this.tickets.findIndex((ticket: { id: any; }) => ticket.id === this.selectedTicket.id);
  
      if (ticketIndex !== -1) {
        const updatedTicket = {
          "description": updatedDescription, 
        };

        this.http.patch(`tickets/${this.selectedTicket.id}`, updatedTicket).subscribe({
          next: (response) => {
            this.tickets[ticketIndex].descricao = updatedTicket;

            this.toastService.success('Descrição do chamado atualizada com sucesso!');
            this.manageDisplay('filter');
            this.updateTicketDescriptionForm.reset();
          },
          error: (error) => {
            console.error('Erro ao atualizar o ticket:', error);
            this.toastService.error('Erro ao atualizar a descrição do chamado.');
          },
          complete: () => {
            this.loadingService.loadingOn();
            this.http.get('tickets').subscribe({
              next: (response) => {
                const data = response.body; 
                this.tickets = data.map((ticket: { id: string; title: string; assigned_to: string; description: string; liveSeo_sync: boolean; }) => ({
                  id: ticket.id,              
                  titulo: ticket.title,         
                  atendente: ticket.assigned_to, 
                  projeto: 'LiveSeo',          
                  data: '23/10/2024',         
                  descricao: ticket.description, 
                  tipo: 'Tipo teste',         
                  subtipo: 'Subtipo teste',    
                  arquivos: 'Arquivos teste',   
                  sincronizado: ticket.liveSeo_sync 
                }));
                this.dataSource = new MatTableDataSource(this.tickets); 
                this.dataSource.paginator = this.paginator;
                console.log('Dados carregados com sucesso:', this.tickets);
              },
              error: (error) => {
                console.error('Erro ao buscar os dados da API:', error);
              },
              complete: () => {
                this.loadingService.loadingOff(); 
                this.cdr.detectChanges(); 
              }
            });
          }
        });
      } else {
        this.toastService.error('Ticket não encontrado.');
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

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }
}