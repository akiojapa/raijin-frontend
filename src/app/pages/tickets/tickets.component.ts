import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faSquarePlus, faComment, faUser, faCog, faAnglesLeft, faSignInAlt, faMagnifyingGlass, faCalendarDays, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { HeaderComponent } from "../../components/header/header.component";
import { GROUPS } from "../../helpers/groups";
import { PAGES } from "../../helpers/pages";
import { IGroup } from "../../interfaces/groups";
import { IPages } from "../../interfaces/pages";


@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [FontAwesomeModule, HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
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
  choosenGroup: IGroup = this.groups[0];
  newMessageContent: string = '';

  constructor(private fb: FormBuilder) {}

  chamados = [
    { id: '#2357', titulo: 'Chat Teste', atendente: 'Caio', projeto: 'Projeto 1' },
    { id: '#1983', titulo: 'Chat Teste', atendente: 'Eduardo', projeto: 'Projeto 12' },
    { id: '#2327', titulo: 'Chat Teste', atendente: 'João', projeto: 'Projeto 49' },
    { id: '#4782', titulo: 'Chat Teste', atendente: 'Renan', projeto: 'Projeto 9' },
    { id: '#1209', titulo: 'Chat Teste', atendente: 'Gustavo', projeto: 'Projeto 3' },
    { id: '#1398', titulo: 'Chat Teste', atendente: 'Felipe', projeto: 'Projeto 5' },
    { id: '#1367', titulo: 'Chat Teste', atendente: 'Lucas', projeto: 'Projeto 2' },
    { id: '#4938', titulo: 'Chat Teste', atendente: 'Pedro', projeto: 'Projeto 82' },
  ];
}
