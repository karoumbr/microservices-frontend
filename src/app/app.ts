import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header>
      <h1>Gestion RH</h1>
      <nav>
        <a routerLink="/departments" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Départements</a>
        <a routerLink="/departments/new" routerLinkActive="active">+ Département</a>
        <a routerLink="/employees" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Employés</a>
        <a routerLink="/employees/new" routerLinkActive="active">+ Employé</a>
      </nav>
    </header>
    <main><router-outlet /></main>
  `,
})
export class App {}