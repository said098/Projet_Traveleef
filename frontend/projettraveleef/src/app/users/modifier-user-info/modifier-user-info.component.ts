import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/authentification/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifier-user-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modifier-user-info.component.html',
  styleUrls: ['./modifier-user-info.component.css']
})
export class ModifierUserInfoComponent implements OnInit {
  userForm!: FormGroup;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      prenom: ['', [Validators.required, Validators.maxLength(50)]],
      datenaissance: ['', [Validators.required]],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Numéro de téléphone valide (10 chiffres)
    });

    this.userId = this.route.snapshot.paramMap.get('id');
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    if (!this.userId) {
      return;
    }

    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.userForm.patchValue(data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des informations utilisateur :', err);
      },
    });
  }

  updateUserInfo(): void {
    if (this.userForm.valid) {
      const updatedInfo = this.userForm.value;

      if (this.userId) {
        this.authService.updateUserInfo(updatedInfo).subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour des informations utilisateur :', err);
          }
        });
      } else {
        console.error("Aucun ID utilisateur n'a été trouvé");
      }
    } else {
      console.error('Le formulaire est invalide');
    }
  }

  cancelEdit(): void {
    this.router.navigate([`/infoPers/${this.userId}`]);
  }
}
