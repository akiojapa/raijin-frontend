import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FontAwesomeModule, HeaderComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  faCog = faCog;
  

}
