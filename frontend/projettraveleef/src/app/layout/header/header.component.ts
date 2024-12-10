import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  isMenuOpen = false;
  showLogoutMenu = false;
  isLoggedIn = false; // À remplacer par votre logique d'authentification
  userPrenom = 'Utilisateur'; // Remplacez par le prénom de l'utilisateur authentifié
  constructor(private authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  logout(): void {
    this.authService.logout().subscribe();
  }

}
