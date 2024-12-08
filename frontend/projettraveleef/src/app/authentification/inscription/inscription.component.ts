import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/authentification/auth.service';
import { AuthCarouselService } from '../../services/authentification/auth-carousel.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    ButtonModule,
    FloatLabelModule,
    PasswordModule,
    DividerModule,
    ReactiveFormsModule
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {

  public connexion_label: string = 'Si vous avez déja un compte, connectez vous';
  public form_inscription!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private authCarousel: AuthCarouselService) { }

  ngOnInit() {
    this.form_inscription = this.fb.group({
      email: ['', Validators.required],
      tel: ['', Validators.required],
      pwd_confirm: ['', Validators.required]
    });
  }

  prev() {
    this.authCarousel.prev();
  }

  onSubmitForm(formGroup: FormGroup) {
    this.authService.inscription(formGroup.value.email, formGroup.value.tel, formGroup.value.pwd_confirm).subscribe();
  }

}
