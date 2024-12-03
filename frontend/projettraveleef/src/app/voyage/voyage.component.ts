import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class VoyageComponent {
  vols = [
    { compagnie: 'Air France', trajet: 'Paris - Londres', date: '2024-12-01', heure: '12:00', terminal: 'T2' },
    { compagnie: 'British Airways', trajet: 'Paris - New York', date: '2024-12-10', heure: '16:00', terminal: 'T1' },
    { compagnie: 'Lufthansa', trajet: 'Berlin - Paris', date: '2024-12-15', heure: '09:00', terminal: 'T3' }
  ];


  // Générer dynamiquement l'URL du logo
  getLogoUrl(compagnie: string): string {
    const baseUrl = 'https://logo.clearbit.com';
    const domain = compagnie.replace(/\s+/g, '').toLowerCase() + '.com'; // Simplification pour obtenir un domaine
    return `${baseUrl}/${domain}`;
  }

  onLogoError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/default-logo.png'; // Image par défaut
  }
  

  canCancel(date: string): boolean {
    const flightDate = new Date(date);
    const currentDate = new Date();
    const diffInHours = (flightDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60);
    return diffInHours > 48; // Annulable si plus de 48 heures avant la date
  }

  cancelReservation(index: number): void {
    const vol = this.vols[index];
    if (this.canCancel(vol.date)) {
      this.vols.splice(index, 1);
      alert(`La réservation pour "${vol.trajet}" a été annulée.`);
    }
  }
}
