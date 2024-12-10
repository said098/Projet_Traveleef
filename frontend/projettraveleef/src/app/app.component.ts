import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {PageAccueilComponent} from './layout/page-accueil/page-accueil.component';
import { VoyageComponent } from './voyage/voyage.component';
import { VolDetailsComponent } from './vol-details/vol-details.component';
import { FlightSearchComponent } from './layout/flight-search/flight-search.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,PageAccueilComponent, VoyageComponent,VolDetailsComponent,FlightSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'projettraveleef';
}
