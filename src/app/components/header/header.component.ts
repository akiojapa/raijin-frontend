import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  faCog = faCog;
  showConfigDropdown = false;

  toggleConfigDropdown(event: Event) {
    event.stopPropagation();
    this.showConfigDropdown = !this.showConfigDropdown;
  }

  viewProfile() {
    // Adicione a lógica para visualizar o perfil
    console.log('Visualizar Perfil');
  }

  logout() {
    // Adicione a lógica para fazer logout
    console.log('Logout');
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    this.showConfigDropdown = false;
  }

}
