import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface FlightSearchParams {
  departure_id: string;
  arrival_id: string;
  outbound_date: string;
  return_date: string;
  currency: string;
  hl: string;
}

interface FlightResult {
  flights: any[];
}

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  private baseUrl = 'http://localhost:5000/user';

  constructor(private http: HttpClient) {}

  searchTrips(params: FlightSearchParams): Observable<FlightResult> {
    const url = `${this.baseUrl}/search_trips`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<FlightResult>(url, params, { headers });
  }

}
