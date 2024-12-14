import { Component } from '@angular/core';
import {Router, RouterLink } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AuthService } from '../../services/authentification/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink, FormsModule,CommonModule,  RouterLink],
  standalone: true,
})
export class HeaderComponent {
  constructor(private authService: AuthService,private router: Router) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  logout(): void {
    this.authService.logout().subscribe();
  }

  goToInfoPers(): void {
    this.authService.getUserId().subscribe({
      next: (userId) => {
        if (userId) {
          console.log('Redirection vers /infoPers avec ID :', userId);
          this.router.navigate([`/infoPers`, userId]);
        } else {
          console.error('Impossible de récupérer l\'ID utilisateur');
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'ID utilisateur :', err);
      },
    });
  }



}
