import { Component, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { DEPARTMENT_URL } from './department.service';
import { EMPLOYEE_URL } from './employee.service';
import { Department, Employee } from './models';

@Component({
  selector: 'app-employee-list',
  template: `
    <h2>Employés</h2>

    <label>Filtrer par département
      <select (change)="onFilter($any($event.target).value)">
        <option value="">Tous</option>
        @for (d of departments.value(); track d.id) {
          <option [value]="d.id">{{ d.name }}</option>
        }
      </select>
    </label>

    @if (employees.error()) { <p class="error">Impossible de charger les employés.</p> }

    <table>
      <thead><tr><th>ID</th><th>Nom</th><th>Âge</th><th>Poste</th><th>Département</th></tr></thead>
      <tbody>
        @for (e of employees.value(); track e.id) {
          <tr>
            <td>{{ e.id }}</td><td>{{ e.name }}</td><td>{{ e.age }}</td>
            <td>{{ e.position }}</td><td>{{ departmentName(e.departmentId) }}</td>
          </tr>
        } @empty {
          <tr><td colspan="5" class="muted">
            {{ employees.isLoading() ? 'Chargement…' : 'Aucun employé.' }}
          </td></tr>
        }
      </tbody>
    </table>
  `,
})
export class EmployeeList {
  private readonly departmentId = signal<number | null>(null);

  protected readonly departments = httpResource<Department[]>(
    () => DEPARTMENT_URL,
    { defaultValue: [] },
  );

  // La requête se relance automatiquement quand departmentId change.
  protected readonly employees = httpResource<Employee[]>(
    () => {
      const id = this.departmentId();
      return id ? `${EMPLOYEE_URL}/department/${id}` : EMPLOYEE_URL;
    },
    { defaultValue: [] },
  );

  protected onFilter(value: string) {
    this.departmentId.set(value ? Number(value) : null);
  }

  protected departmentName(id: number): string {
    return this.departments.value().find(d => d.id === id)?.name ?? `#${id}`;
  }
}