import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  searchForm: FormGroup;
  itineraries: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private flightsService: FlightsService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      departure_id: ['CDG,ORY'], // Champs existants
      arrival_id: ['LAX'],
      outbound_date: ['2024-12-26'],
      return_date: ['2024-12-30'],
      currency: ['USD'],
      hl: ['en'],
      stops: [0], // Nouveau champ : Nombre d'escales
      include_airlines: [''], // Nouveau champ : Compagnies à inclure
      exclude_airlines: [''], // Nouveau champ : Compagnies à exclure
      max_price: [''] // Nouveau champ : Prix maximum
    });
  }

onSearch() {
  const formData = this.searchForm.value;

  const filters = {
    departure_id: formData.departure_id,
    arrival_id: formData.arrival_id,
    outbound_date: formData.outbound_date,
    return_date: formData.return_date,
    currency: formData.currency,
    hl: formData.hl,
    stops: formData.stops,
    include_airlines: formData.include_airlines ? formData.include_airlines.split(',') : null,
    exclude_airlines: formData.exclude_airlines ? formData.exclude_airlines.split(',') : null,
    max_price: formData.max_price || null,
  };

  this.flightsService.searchTrips(filters).subscribe(
    (response: any) => {
      this.itineraries = response.flights;
      this.errorMessage = this.itineraries.length === 0 ? 'Aucun vol ne correspond à vos recherches.' : null;
    },
    (error) => {
      this.errorMessage = 'Une erreur est survenue.';
      this.itineraries = [];
    }
  );
}


}
