import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import {PageAccueilComponent} from './layout/page-accueil/page-accueil.component';
import {PageProppsComponent} from './layout/page-propps/page-propps.component';

export const routes: Routes = [
  { path: '', component: PageAccueilComponent},
  { path: 'proprodetraveleff', component: PageProppsComponent},
];
