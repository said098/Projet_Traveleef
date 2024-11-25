import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserInfoComponent } from './users/user-info/user-info.component';

export const routes: Routes = [
  
  { path: 'users', component: UsersComponent , 
    children : 
    [
      {path: 'user-info', component : UserInfoComponent}
    ]
  }
];
