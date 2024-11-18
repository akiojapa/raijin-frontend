import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';

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
  userName!: string;

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.userName = this.authService.getName()
  }

  toggleConfigDropdown(event: Event) {
    event.stopPropagation();
    this.showConfigDropdown = !this.showConfigDropdown;
  }

  viewProfile() {
    console.log('Visualizar Perfil');
  }

  logout() {
    console.log('Logout');
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    this.showConfigDropdown = false;
  }

}
