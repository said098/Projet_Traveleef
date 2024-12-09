import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterLink, FormsModule,  RouterLink,],
  standalone: true,
})
export class HeaderComponent {

}
