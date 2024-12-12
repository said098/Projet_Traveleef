import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from '../utilities/api-config.service';
import {catchError, first, map, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private apiConfig: ApiConfigService, private router: Router, private cookieService: CookieService) { }

  inscription(prenom: string, nom: string, datenaissance: string, email: string, tel: number, pwd_confirm: string
  ): Observable<any> {
    return this.http.post(
      this.apiConfig.getURL('/user/inscription'),
      {prenom: prenom, nom: nom, datenaissance: datenaissance, email: email, tel: tel, pwd_confirm: pwd_confirm}
    ).pipe(
      tap(() => {
        this.router.navigate(['/']);
      })
    );
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
  redirectIfAuthenticated(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  logout(): Observable<any> {
    return this.http.post(this.apiConfig.getURL('/user/logout'), {}).pipe(
      tap(() => {
        // Supprimer les cookies ou autres états locaux d'authentification
        this.cookieService.delete('csrf_access_token');
        this.cookieService.deleteAll(); // Optionnel si plusieurs cookies doivent être supprimés

        // Rediriger l'utilisateur vers la page d'authentification
        this.router.navigate(['/']);
      })
    );
  }

  getUserId(): Observable<string | null> {
    return this.http.get<{ id: string }>(this.apiConfig.getURL('/user/route'), {
      withCredentials: true,
    }).pipe(
      tap(response => {
        console.log('Réponse complète depuis le backend :', response); // Ajout de ce log
        console.log('ID utilisateur récupéré depuis le backend :', response.id);
      }),
      first(),
      map(response => response.id || null), // Assurez-vous que `id` est utilisé
      catchError(err => {
        console.error('Erreur lors de la récupération de l\'ID utilisateur :', err);
        return of(null); // Retourne `null` en cas d'erreur
      })
    );
  }
  getUserInfo(): Observable<any> {
    return this.http.get(this.apiConfig.getURL('/user/infoPerso'), {
      withCredentials: true, // Inclut les cookies dans la requête
    }).pipe(
      tap(data => console.log('Données utilisateur reçues :', data)),
      catchError(err => {
        console.error('Erreur lors de la récupération des informations utilisateur :', err);
        return throwError(err); // Relance l'erreur pour que le composant puisse la gérer
      })
    );
  }


  getUserInfoById(): Observable<any> {
    return this.http.get(this.apiConfig.getURL('/user/infoPerso'), {
      withCredentials: true,
    }).pipe(
      tap(data => console.log('Données utilisateur reçues :', data)),
      catchError(err => {
        console.error('Erreur lors de la récupération des informations utilisateur :', err);
        return throwError(err);
      })
    );
  }

  updateUserInfo(updatedInfo: any): Observable<any> {
    const csrfToken = this.cookieService.get('csrf_access_token');

    return this.http.put(this.apiConfig.getURL('/user/update'), updatedInfo, {
      withCredentials: true,
      headers: {
        'X-CSRF-TOKEN': csrfToken,
      },
    }).pipe(
      tap(() => {
        console.log('Informations utilisateur mises à jour avec succès');
      }),
      catchError(err => {
        console.error('Erreur lors de la mise à jour des informations utilisateur :', err);
        return throwError(err);
      })
    );
  }









}
