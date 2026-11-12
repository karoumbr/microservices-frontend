import { Component, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { DEPARTMENT_URL } from './department.service';
import { EMPLOYEE_URL } from './employee.service';
import { Department, Employee } from './models';

@Component({
  selector: 'app-department-detail',
  imports: [RouterLink],
  template: `
    <a routerLink="/departments">← Retour</a>

    @if (department.isLoading()) { <p>Chargement…</p> }
    @if (department.error()) { <p class="error">Département introuvable.</p> }

    @if (department.hasValue()) {
      @let d = department.value();
      <section class="card">
        <h2>{{ d.name }} <small>(#{{ d.id }})</small></h2>

        <h3>Employés</h3>
        @if (employees.error()) { <p class="error">Impossible de charger les employés.</p> }

        <table>
          <thead><tr><th>ID</th><th>Nom</th><th>Âge</th><th>Poste</th></tr></thead>
          <tbody>
            @for (e of employees.value(); track e.id) {
              <tr><td>{{ e.id }}</td><td>{{ e.name }}</td><td>{{ e.age }}</td><td>{{ e.position }}</td></tr>
            } @empty {
              <tr><td colspan="4" class="muted">
                {{ employees.isLoading() ? 'Chargement…' : 'Aucun employé.' }}
              </td></tr>
            }
          </tbody>
        </table>
      </section>
    }
  `,
})
export class DepartmentDetail {
  readonly id = input.required<string>();

  protected readonly department = httpResource<Department>(
    () => `${DEPARTMENT_URL}/${this.id()}`,
  );

  protected readonly employees = httpResource<Employee[]>(
    () => `${EMPLOYEE_URL}/department/${this.id()}`,
    { defaultValue: [] },
  );
}