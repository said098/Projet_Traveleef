import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlightSearchComponent } from '../flight-search/flight-search.component';

@Component({
  selector: 'app-page-accueil',
  standalone: true,
  imports: [RouterLink, FormsModule, RouterOutlet, FlightSearchComponent],
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.css']
})
export class PageAccueilComponent {}
