import {Component, ViewEncapsulation} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FlightsService } from '../../services/flights.service';
import { FlightDetailsModalComponent } from '../flight-details-modal/flight-details-modal.component';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FlightDetailsModalComponent],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  encapsulation: ViewEncapsulation.Emulated,

})
export class FlightSearchComponent {
  searchForm: FormGroup;
  itineraries: any[] = [];
  errorMessage: string | null = null;

  selectedFlight: any = null;

  constructor(
    private flightsService: FlightsService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      departure_id: ['CDG,ORY'],
      arrival_id: ['LAX'],
      outbound_date: ['2024-12-26'],
      return_date: ['2024-12-30'],
      currency: ['USD'],
      hl: ['en'],
      stops: [0],
      include_airlines: [''],
      exclude_airlines: [''],
      max_price: ['']
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

  console.log('Filtres envoyés :', filters);

  this.flightsService.searchTrips(filters).subscribe(
    (response: any) => {
      console.log('Réponse reçue :', response);
      this.itineraries = response.flights || [];
      this.errorMessage = response.message || null;
    },
    (error) => {
      this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
      console.error('Erreur API :', error);
    }
  );
}

openFlightDetails(flight: any) {
  console.log('Vol sélectionné:', flight);
  this.selectedFlight = flight;
}

closeFlightDetails() {
  this.selectedFlight = null;
}




}
