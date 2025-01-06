import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { AuthorizedPerson } from '../models/authorized-person.model';
import { UnauthorizedPerson } from '../models/unauthorized-person.model';
import { FlaggedPerson } from '../models/flagged-person.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/access';

  authorizedPeople = signal<AuthorizedPerson[]>([]);
  unauthorizedPeople = signal<UnauthorizedPerson[]>([]);
  flaggedPeople = signal<FlaggedPerson[]>([]);
  
  isLoadingAuthorized = signal<boolean>(false);
  isLoadingUnauthorized = signal<boolean>(false);
  isLoadingFlagged = signal<boolean>(false);

  ngOnInit() {
    this.loadAllPeople();
  }

  loadAllPeople() {
    this.loadAuthorizedPeople();
    this.loadUnauthorizedPeople();
    this.loadFlaggedPeople();
  }

  private loadAuthorizedPeople() {
    this.isLoadingAuthorized.set(true);
    this.http.get<string[]>(`${this.baseUrl}/authorized/get`).subscribe({
      next: (names) => {
        console.log('Authorized People:', names);
        const people = names.map((name, index) => ({
          id: index + 1,
          name: name,
          image: 'assets/default-image.jpeg'
        }));
        this.authorizedPeople.set(people);
        this.isLoadingAuthorized.set(false);
      },
      error: (error) => {
        console.error('Failed to load authorized people', error);
        this.isLoadingAuthorized.set(false);
      }
    });
  }

  private loadUnauthorizedPeople() {
    this.isLoadingUnauthorized.set(true);
    this.http.get<string[]>(`${this.baseUrl}/unauthorized/get`).subscribe({
      next: (names) => {
        console.log('Unauthorized People:', names);
        const people = names.map((name, index) => ({
          id: index + 1,
          name: name,
          image: 'assets/default-image.jpeg'
        }));
        this.unauthorizedPeople.set(people);
        this.isLoadingUnauthorized.set(false);
      },
      error: (error) => {
        console.error('Failed to load unauthorized people', error);
        this.isLoadingUnauthorized.set(false);
      }
    });
  }

  private loadFlaggedPeople() {
    this.isLoadingFlagged.set(true);
    this.http.get<string[]>(`${this.baseUrl}/flagged/get`).subscribe({
      next: (names) => {
        console.log('Flagged People:', names);
        const people = names.map((name, index) => ({
          id: index + 1,
          name: name,
          image: 'assets/default-image.jpeg'
        }));
        this.flaggedPeople.set(people);
        this.isLoadingFlagged.set(false);
      },
      error: (error) => {
        console.error('Failed to load flagged people', error);
        this.isLoadingFlagged.set(false);
      }
    });
  }
}
