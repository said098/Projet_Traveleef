import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiConfig: ApiConfigService, private http: HttpClient) { }

  public connexion(email: string, pwd: string) {
    return this.http.post(this.apiConfig.getApiUrl('/user/connexion'), { email, pwd });
  }

  public inscription(email: string, pwd: string) {
    return this.http.post(this.apiConfig.getApiUrl('/user/inscription'), { email, pwd });
  }
}
