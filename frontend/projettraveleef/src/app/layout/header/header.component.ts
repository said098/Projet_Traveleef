import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {ConnexionComponent} from '../../fonctionnalites/connexion/connexion.component';
import {FormsModule} from '@angular/forms';
import {EtudiantsComponent} from '../../fonctionnalites/etudiants/etudiants.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink,ConnexionComponent, FormsModule, EtudiantsComponent, RouterLink,],
  standalone: true,
})
export class HeaderComponent {

}
