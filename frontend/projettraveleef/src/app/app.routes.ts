import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { VoyageComponent } from './voyage/voyage.component';

export const routes: Routes = [
<<<<<<< HEAD
  
  { path: 'users', component: UsersComponent , 
    children : 
    [
      {path: 'user-info', component : UserInfoComponent}
    ]
  },

  { path: 'voyage', component: VoyageComponent }
=======
  //{ path: '', redirectTo: '/users', pathMatch: 'full' },
  //{ path: 'users', component: UsersComponent }
>>>>>>> origin/headerEtFooter
];
