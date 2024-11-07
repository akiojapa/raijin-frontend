import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarDays, faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ticket-window',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule],
  templateUrl: './ticket-window.component.html',
  styleUrls: ['./ticket-window.component.scss']
})
export class TicketWindowComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faCalendarDays = faCalendarDays;
  faChevronDown = faChevronDown;

  showFilterTicketDiv = true; // Assuming this is a property to control the visibility
}
