import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { TestPageComponent } from './pages/test-page/test-page.component';

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
        path: 'menu/ticket',
        component: TestPageComponent
    },
    {
        path: 'menu/chat',
        component: MenuComponent
    },
];
