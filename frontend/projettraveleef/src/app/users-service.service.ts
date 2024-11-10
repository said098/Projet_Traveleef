import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  //private apiUrl = 'http://localhost:5000/users'; // URL de l'API backend Flask

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    //return this.http.get<any[]>(this.apiUrl);  // Utiliser apiUrl ici
    return this.http.get<any[]>(`/api/users`);

  }
}




