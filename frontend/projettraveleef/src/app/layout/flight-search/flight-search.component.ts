import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="searchForm" (ngSubmit)="onSearch()" class="d-flex flex-wrap align-items-center justify-content-center gap-2">
      <input formControlName="departure_id" type="text" class="form-control w-auto" placeholder="Aéroport de départ (ex: CDG,ORY)">
      <input formControlName="arrival_id" type="text" class="form-control w-auto" placeholder="Aéroport d'arrivée (ex: LAX)">
      <input formControlName="outbound_date" type="date" class="form-control w-auto">
      <input formControlName="return_date" type="date" class="form-control w-auto">
      <input formControlName="currency" type="text" class="form-control w-auto" placeholder="Devise (ex: USD)">
      <input formControlName="hl" type="text" class="form-control w-auto" placeholder="Langue (ex: en)">
      <button type="submit" class="btn btn-success w-auto">Rechercher</button>
    </form>

    <div *ngIf="errorMessage" class="text-danger mt-3 text-center">{{ errorMessage }}</div>

    <div *ngIf="flights.length > 0" class="mt-3">
      <h3>Résultats :</h3>
      <ul>
        <li *ngFor="let flight of flights">
          {{ flight | json }}
        </li>
      </ul>
    </div>
  `,
  styleUrls: []
})
export class FlightSearchComponent {
  searchForm: FormGroup;
  flights: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private flightsService: FlightsService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      departure_id: ['CDG,ORY'],
      arrival_id: ['LAX'],
      outbound_date: ['2024-12-20'],
      return_date: ['2024-12-30'],
      currency: ['USD'],
      hl: ['en']
    });
  }

  onSearch() {
    const params = this.searchForm.value;
    this.flightsService.searchTrips(params).subscribe({
      next: (data) => {
        this.flights = data.flights;
        this.errorMessage = null;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Une erreur est survenue lors de la recherche.';
      }
    });
  }
}
