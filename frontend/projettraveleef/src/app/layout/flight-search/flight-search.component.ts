import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FlightsService } from '../../services/flights.service';

interface AirportInfo {
  id: string;
  name: string;
  time: string; // "YYYY-MM-DD HH:mm"
}

interface FlightSegment {
  airline: string;
  airline_logo: string;
  airplane: string;
  arrival_airport: AirportInfo;
  departure_airport: AirportInfo;
  duration: number; // durée en minutes
  flight_number: string;
}

interface Itinerary {
  airline_logo: string;
  carbon_emissions: any;
  price: number;
  total_duration: number;
  type: string; // "Round trip", etc.
  flights: FlightSegment[];
}

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  searchForm: FormGroup;
  itineraries: Itinerary[] = [];
  errorMessage: string | null = null;

  constructor(
    private flightsService: FlightsService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      departure_id: ['CDG,ORY'],
      arrival_id: ['LAX'],
      outbound_date: ['2024-12-26'],
      return_date: ['2024-12-29'],
      currency: ['USD'],
      hl: ['en']
    });
  }

  onSearch() {
    const params = this.searchForm.value;
    this.flightsService.searchTrips(params).subscribe({
      next: (data) => {
        // On suppose que data.flights est le format reçu.
        // On map directement les données dans itineraries (pas forcément besoin de transformation si déjà conforme).
        this.itineraries = data.flights;
        this.errorMessage = null;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Une erreur est survenue lors de la recherche.';
      }
    });
  }
}

