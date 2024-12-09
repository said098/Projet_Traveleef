import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from '../utilities/api-config.service';
import { first, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private apiConfig: ApiConfigService, private router: Router, private cookieService: CookieService) { }

  inscription(email: string, tel: number, pwd_confirm: string): Observable<any> {
    return this.http.post(
      this.apiConfig.getURL('/user/inscription'),
      {
        email: email,
        tel: tel,
        pwd_confirm: pwd_confirm
      }
    )
  }

  connexion(id: string, password: string): Observable<any> { 
    return this.http.get(
      this.apiConfig.getURL('/user/connexion'),
      { headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(id + ':' + password)
      }),
      withCredentials: true
      }
    ).pipe(first(), tap((response: any) => {
      this.router.navigate(['/']);
    }));
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('csrf_access_token');
  }

}
