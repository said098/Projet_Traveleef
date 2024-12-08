import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AuthPageComponent } from './authentification/auth-page/auth-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'auth', component: AuthPageComponent }
];
