import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentification/auth.service';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthCarouselService } from '../../services/authentification/auth-carousel.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    PasswordModule,
    ButtonModule,
    FloatLabelModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent implements OnInit {

  public inscription_label: string = 'Si vous n’avez pas de compte, créer un compte';
  public form_connexion!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private authCarousel: AuthCarouselService) { }

  ngOnInit() {
    this.form_connexion = this.fb.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  }

  next() {
    this.authCarousel.next();
  }

  onSubmitForm(formGroup: FormGroup) {
    this.authService.connexion(formGroup.value.email, formGroup.value.pwd).subscribe();
  }

}
