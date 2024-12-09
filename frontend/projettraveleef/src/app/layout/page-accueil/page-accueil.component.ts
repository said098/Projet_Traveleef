import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Flight {
  origin: string;
  destination: string;
  operatingCarrierCode: string;
  flightNumber: string;
  departureDate: string;
}

@Component({
  selector: 'app-page-accueil',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './page-acceuil.component.html',
  styleUrls: ['./page-acceuil.component.css']
})
export class PageAccueilComponent {
  search = {
    origin: '',
    destination: '',
    outboundDate: '',
    returnDate: '',
    numPassengers: 1
  };

  filters = {
    oneStop: false,
    twoStops: false,
    noStops: false,
    ryanair: false,
    airfrance: false,
    transavia: false
  };

  flights: Flight[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private http: HttpClient) {}

  onSearch(): void {
    // Validation de base
    if (!this.search.origin || !this.search.destination || !this.search.outboundDate) {
      this.error = 'Veuillez remplir les champs obligatoires.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.flights = [];

    // Préparer les filtres
    const selectedStops = [];
    if (this.filters.oneStop) selectedStops.push(1);
    if (this.filters.twoStops) selectedStops.push(2);
    if (this.filters.noStops) selectedStops.push(0);

    const selectedAirlines = [];
    if (this.filters.ryanair) selectedAirlines.push('RYR');
    if (this.filters.airfrance) selectedAirlines.push('AFR');
    if (this.filters.transavia) selectedAirlines.push('TRS');

    // Préparer les données à envoyer à l'API
    const payload: any = {
      departure_id: this.search.origin,
      arrival_id: this.search.destination,
      outbound_date: this.search.outboundDate,
      return_date: this.search.returnDate,
      currency: 'USD',
      hl: 'fr',
      passengers: this.search.numPassengers
    };

    if (selectedStops.length > 0) {
      payload.stops = selectedStops;
    }

    if (selectedAirlines.length > 0) {
      payload.airlines = selectedAirlines;
    }

    // Appeler l'API backend
    this.http.post<{ flights: Flight[] }>('/user/search_trips', payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true // Si vous utilisez des cookies JWT
    }).subscribe({
      next: (response) => {
        this.flights = response.flights;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.error.error || 'Une erreur est survenue';
        this.loading = false;
      }
    });
  }
}
