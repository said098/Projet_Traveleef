import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {FilterComponent} from '../../filter/filter.component';
import {SearchComponent} from "../../search/search.component";

@Component({
  selector: 'app-page-accueil',
  standalone: true,
    imports: [RouterLink, FormsModule, RouterLink, FilterComponent, SearchComponent,],
  templateUrl: './page-accueil.component.html',
  styleUrl: './page-accueil.component.css'
})
export class PageAccueilComponent {

}
