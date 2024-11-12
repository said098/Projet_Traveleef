import {Button, ButtonModule} from 'primeng/button';
import { Component, OnDestroy } from '@angular/core';
import {UsersServiceService} from '../users-service.service';
import {FormsModule} from '@angular/forms';
import {NgFor, NgIf} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, NgFor, RouterOutlet, RouterLink, NgIf, Button],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnDestroy {
  users: any[] = [];
  private getUsers$: Subscription = new Subscription;

  constructor(private usersService: UsersServiceService) {}

  ngOnDestroy(): void {
    this.getUsers$ && this.getUsers$.unsubscribe();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
     this.getUsers$ = this.usersService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    });

  }
}
