import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { ChatListComponent } from './pages/chat/chat-list/chat-list.component';
import { ChatWindowComponent } from './pages/chat/chat-window/chat-window.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'menu',
        component: MenuComponent,
        children: [
            { path: 'chat', outlet: 'left', component: ChatWindowComponent }, 
            { path: 'chat', outlet: 'right', component: ChatListComponent }, 
        ]
        
    }

];
