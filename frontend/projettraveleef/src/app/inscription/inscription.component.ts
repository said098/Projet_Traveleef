import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    PasswordModule,
    DividerModule
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent implements OnInit {
  
  public form_inscription!: FormGroup;
  public connexion_label: string = 'Connexion';
  
  constructor(private auth: AuthService) { }
  
  ngOnInit(): void {
  }
  
  prev() {
    throw new Error('Method not implemented.');
  }

  onSubmitForm(formGroup: FormGroup) {
    this.auth.inscription(formGroup.value.email, formGroup.value.pwd);
  }
}
