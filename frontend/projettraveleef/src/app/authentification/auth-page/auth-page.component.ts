import { Component, OnInit } from '@angular/core';
import { ConnexionComponent } from '../connexion/connexion.component';
import { InscriptionComponent } from '../inscription/inscription.component';
import { AuthCarouselService } from '../../services/authentification/auth-carousel.service';
import { AuthService } from '../../services/authentification/auth.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    ConnexionComponent,
    InscriptionComponent
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent implements OnInit {
  transform_style!: string;

  constructor(private authCarouselService: AuthCarouselService,private authService: AuthService) { }

  ngOnInit(): void {
    this.authCarouselService.transform_style$.subscribe((transform_style) => {
      this.transform_style = transform_style;
      console.log(this.transform_style);
    });
    this.authService.redirectIfAuthenticated();


  }
}
