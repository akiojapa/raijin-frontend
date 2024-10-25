import { AfterViewChecked, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSquarePlus, faComment, faUser, faCog, faAnglesLeft,
  faSignInAlt, faSmile, faPaperPlane,
  faImage,
  faFile,
  faVideo,
  faEllipsisV,
  faAnglesRight
} from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PAGES } from '../../helpers/pages';
import { IPages } from '../../interfaces/pages';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu',
  imports: [FontAwesomeModule, HeaderComponent, ReactiveFormsModule, CommonModule, FormsModule, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  animations: [
    // Animação para o menu lateral
    trigger('toggleSidebar', [
      state('expanded', style({
        transform: 'translateX(0)',
        opacity: 1,
        zIndex: 10
      })),
      state('collapsed', style({
        transform: 'translateX(100%)',
        opacity: 0,
        zIndex: -1
      })),
      transition('expanded <=> collapsed', [
        animate('0.3s ease-in-out')
      ])
    ]),
    // Animação para o menu horizontal
    trigger('toggleFooter', [
      state('expanded', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      state('collapsed', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      transition('expanded <=> collapsed', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class MenuComponent {
  pages: IPages[] = PAGES;


  faAnglesLeft = faAnglesLeft;
  faAnglesRight = faAnglesRight;
  faSignOutAlt = faSignInAlt;

  isCollapsed: boolean = true;
  isFooterCollapsed: boolean = true;


  constructor(private router: Router,
    private route: ActivatedRoute
  ) { }


  isSelected(page: any): boolean {
    console.log(this.router.url);
    return this.router.url.includes(page.path);
  }

  navigateTo(path: string) {
    console.log(path);
    this.router.navigate(
      [
        'menu',
        {
          outlets: { left: path, right: path }
        }
      ],
    );
  }

  toggleMenu() {
    if (this.isCollapsed) {
      this.isCollapsed = !this.isCollapsed;
      setTimeout(() => {
        this.isFooterCollapsed = !this.isFooterCollapsed;
      }, 200);
    } else {
      this.isFooterCollapsed = !this.isFooterCollapsed;
      setTimeout(() => {
        this.isCollapsed = !this.isCollapsed;
      }, 100);
    }
  }

}