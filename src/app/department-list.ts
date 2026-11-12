import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { DEPARTMENT_URL } from './department.service';
import { Department } from './models';

@Component({
  selector: 'app-department-list',
  imports: [RouterLink],
  template: `
    <h2>Départements et leurs employés</h2>

    @if (departments.isLoading()) { <p>Chargement…</p> }
    @if (departments.error()) { <p class="error">Impossible de charger les départements.</p> }

    @for (d of departments.value(); track d.id) {
      <section class="card">
        <h3>
          <a [routerLink]="['/departments', d.id]">{{ d.name }}</a>
          <small>(#{{ d.id }})</small>
        </h3>

        @if (d.employees?.length) {
          <table>
            <thead><tr><th>ID</th><th>Nom</th><th>Âge</th><th>Poste</th></tr></thead>
            <tbody>
              @for (e of d.employees; track e.id) {
                <tr><td>{{ e.id }}</td><td>{{ e.name }}</td><td>{{ e.age }}</td><td>{{ e.position }}</td></tr>
              }
            </tbody>
          </table>
        } @else {
          <p class="muted">Aucun employé.</p>
        }
      </section>
    } @empty {
      @if (!departments.isLoading() && !departments.error()) {
        <p class="muted">Aucun département.</p>
      }
    }
  `,
})
export class DepartmentList {
  protected readonly departments = httpResource<Department[]>(
    () => `${DEPARTMENT_URL}/with-employees`,
    { defaultValue: [] },
  );
}