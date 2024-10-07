import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquarePlus, faComment, faUser, faCog, faAnglesLeft, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PAGES } from '../../helpers/pages';
import { IPages } from '../../interfaces/pages';
import { IGroup, IMessage } from '../../interfaces/groups';
import { GROUPS } from '../../helpers/groups';


@Component({
  selector: 'app-menu',
  imports: [FontAwesomeModule, HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true
})
export class MenuComponent {
  pages: IPages[] = PAGES;
  groups: IGroup[] = GROUPS;

  faSquarePlus = faSquarePlus;
  faComment = faComment;
  faUser = faUser;
  faCog = faCog;
  faAnglesLeft = faAnglesLeft;
  faSignOutAlt = faSignInAlt;
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