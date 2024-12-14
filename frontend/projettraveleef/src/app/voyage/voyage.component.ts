import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VolService } from '../services/vol.service';
import { Trajet } from '../models/trajet.model';

@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [VolService],
})
export class VoyageComponent implements OnInit {
  trajets: Trajet[] = [];

  constructor(private volService: VolService) {}

  ngOnInit(): void {
    this.volService.getVols().subscribe(
      (data: Trajet[]) => {
        this.trajets = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des trajets :', error);
      }
    );
  }

  getLogoUrl(compagnie: string | undefined): string {
    const predefinedDomains: { [key: string]: string } = {
      'Air France': 'airfrance.com',
      'British Airways': 'ba.com',
      'Lufthansa': 'lufthansa.com',
      'Norwegian Air': 'norwegian.com',
      'TGV': 'sncf-voyageurs.com',
      'BlaBlaBus': 'blablacar.fr',
    };

    const domain =
      predefinedDomains[compagnie || ''] ||
      (compagnie ? compagnie.replace(/\s+/g, '').toLowerCase() + '.com' : 'default.com');

    return `https://logo.clearbit.com/${domain}`;
  }

  onLogoError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/default-logo.png';
  }

  goBack(): void {
    window.history.back();
  }
}
