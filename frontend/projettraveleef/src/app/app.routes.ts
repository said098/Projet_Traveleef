import { Routes } from '@angular/router';
import { VoyageComponent } from './voyage/voyage.component';
import {PageAccueilComponent} from './layout/page-accueil/page-accueil.component';
import {PageProppsComponent} from './layout/page-propps/page-propps.component';
import { VolDetailsComponent } from './vol-details/vol-details.component';


export const routes: Routes = [
  { path: '', component: PageAccueilComponent},
  { path: 'proprodetraveleff', component: PageProppsComponent},
  { path: 'voyage', component: VoyageComponent },
  { path: 'vol/:id', component: VolDetailsComponent },

];



