import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    PasswordModule,
    DividerModule,
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent implements OnInit {
  
  public form_connexion!: FormGroup;
  public inscription_label: string = "Pas encore inscrit ?";
  
  constructor(private fb: FormBuilder, private auth: AuthService) { }
  
  ngOnInit(): void {
    this.form_connexion = this.fb.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  }

  next() {
    throw new Error('Method not implemented.');
  }

  onSubmitForm(formGroup: FormGroup) {
    this.auth.connexion(formGroup.value.email, formGroup.value.pwd);
  }
}
