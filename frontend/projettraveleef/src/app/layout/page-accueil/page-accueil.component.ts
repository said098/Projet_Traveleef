import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-page-accueil',
  standalone: true,
  imports: [RouterLink, FormsModule, RouterLink,  RouterOutlet,],
  templateUrl: './page-accueil.component.html',
  styleUrl: './page-accueil.component.css'
})
export class PageAccueilComponent {

}
