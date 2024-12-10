import { Routes } from '@angular/router';
import { VoyageComponent } from './voyage/voyage.component';
import {PageAccueilComponent} from './layout/page-accueil/page-accueil.component';
import {PageProppsComponent} from './layout/page-propps/page-propps.component';
import { VolDetailsComponent } from './vol-details/vol-details.component';

import { AuthPageComponent } from './authentification/auth-page/auth-page.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { ModifierUserInfoComponent } from './users/modifier-user-info/modifier-user-info.component';

export const routes: Routes = [
  { path: '', component: PageAccueilComponent},
  { path: 'proprodetraveleff', component: PageProppsComponent},
  { path: 'voyage', component: VoyageComponent },
  { path: 'vol/:id', component: VolDetailsComponent },
  { path: 'auth', component: AuthPageComponent },
  { path: 'infoPers/:id', component: UserInfoComponent},
  { path: 'infoPers/edit/:id', component: ModifierUserInfoComponent },

];



