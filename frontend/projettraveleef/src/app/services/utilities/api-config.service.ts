import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  constructor() { }

  getURL(endpoint: string) {
    return 'http://localhost:5000' + endpoint;
  }
}
