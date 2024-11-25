import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  constructor() { }

  getApiUrl(endpoint: string): any {
    return `http://localhost:3000/${endpoint}`;
  }
}
