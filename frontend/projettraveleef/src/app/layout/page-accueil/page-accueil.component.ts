import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {FilterComponent} from '../../filter/filter.component';

@Component({
  selector: 'app-page-accueil',
  standalone: true,
  imports: [RouterLink, FormsModule, RouterLink, FilterComponent,],
  templateUrl: './page-accueil.component.html',
  styleUrl: './page-accueil.component.css'
})
export class PageAccueilComponent {

}
