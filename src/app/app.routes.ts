import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { ChatListComponent } from './pages/chat/chat-list/chat-list.component';
import { ChatWindowComponent } from './pages/chat/chat-window/chat-window.component';
import { TicketWindowComponent } from './pages/ticket/ticket-window/ticket-window.component';
import { TicketListComponent } from './pages/ticket/ticket-list/ticket-list.component';
import { AuthGuard } from './guards/auth.guard';

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
        path: 'menu/chat',
        component: MenuComponent,
        children: [
            { path: '', component: ChatWindowComponent, outlet: 'left' },
            { path: '', component: ChatListComponent, outlet: 'right' },
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'menu/ticket',
        component: MenuComponent,
        children: [
            { path: '', component: TicketWindowComponent, outlet: 'left' },
            { path: '', component: TicketListComponent, outlet: 'right' },
        ],
        canActivate: [AuthGuard]
    },

];
