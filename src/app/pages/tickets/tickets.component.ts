import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faSquarePlus, faComment, faUser, faCog, faAnglesLeft, faSignInAlt, faMagnifyingGlass, faCalendarDays, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { HeaderComponent } from "../../components/header/header.component";
import { GROUPS } from "../../helpers/groups";
import { PAGES } from "../../helpers/pages";
import { IGroup, IMessage } from "../../interfaces/groups";
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

  chooseGroup(group: IGroup): void {
    this.choosenGroup = group;
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
}
