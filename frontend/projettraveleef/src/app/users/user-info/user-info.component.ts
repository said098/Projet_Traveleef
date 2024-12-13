import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authentification/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user = data;
        console.log('Informations utilisateur :', this.user);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des informations utilisateur', err);
      },
    });
  }

  editUserInfo(): void {
    if (this.user && this.user._id) {
      this.router.navigate([`/infoPers/edit/${this.user._id}`]);
    } else {
      console.error('Impossible de rediriger : ID utilisateur manquant');
    }
  }
}
