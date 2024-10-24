import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquarePlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IGroup } from '../../../interfaces/groups';
import { GROUPS } from '../../../helpers/groups';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent {
  @Input() groups: IGroup[] = GROUPS;
  @Input() chooseGroup!: (group: any) => void;

  filteredGroups: any[] = [];
  searchQuery: string = '';
  faSquarePlus: IconDefinition = faSquarePlus;
  ngOnInit() {
    this.filteredGroups = this.groups;
  }

  // Método para filtrar grupos com base na consulta de pesquisa
  filterGroups() {
    this.filteredGroups = this.groups.filter(group => 
      group.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
