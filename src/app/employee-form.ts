import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Router } from '@angular/router';
import { form, FormField, min, required } from '@angular/forms/signals';
import { DEPARTMENT_URL } from './department.service';
import { EmployeeService } from './employee.service';
import { Department } from './models';

@Component({
  selector: 'app-employee-form',
  imports: [FormField],
  template: `
    <h2>Nouvel employé</h2>
    <form novalidate (submit)="submit($event)">
      <label>ID <input type="number" [formField]="employeeForm.id" /></label>
      <label>Nom <input [formField]="employeeForm.name" /></label>
      <label>Âge <input type="number" [formField]="employeeForm.age" /></label>
      <label>Poste <input [formField]="employeeForm.position" /></label>
      <label>Département
        <select [formField]="employeeForm.departmentId">
          <option value="" disabled>— choisir —</option>
          @for (d of departments.value(); track d.id) {
            <option [value]="d.id">{{ d.name }}</option>
          }
        </select>
      </label>

      @if (employeeForm().touched() && employeeForm().invalid()) {
        <p class="error">Veuillez corriger les champs invalides.</p>
      }
      @if (departments.error()) { <p class="error">Impossible de charger les départements.</p> }
      @if (error()) { <p class="error">{{ error() }}</p> }

      <button type="submit" [disabled]="employeeForm().invalid() || saving()">Enregistrer</button>
    </form>
  `,
})
export class EmployeeForm {
  private readonly service = inject(EmployeeService);
  private readonly router = inject(Router);

  protected readonly departments = httpResource<Department[]>(
    () => DEPARTMENT_URL,
    { defaultValue: [] },
  );

  protected readonly saving = signal(false);
  protected readonly error = signal('');

  private readonly model = signal({ id: 0, name: '', age: 18, position: '', departmentId: '' });

  protected readonly employeeForm = form(this.model, (schema) => {
    min(schema.id, 1, { message: 'L’ID doit être supérieur ou égal à 1.' });
    required(schema.name, { message: 'Le nom est obligatoire.' });
    required(schema.position, { message: 'Le poste est obligatoire.' });
    required(schema.departmentId, { message: 'Choisissez un département.' });
    min(schema.age, 16, { message: 'L’âge minimum est 16 ans.' });
  });

  protected submit(event: Event) {
    event.preventDefault();
    if (this.employeeForm().invalid()) return;

    const v = this.model();
    this.saving.set(true);
    this.service.add({
      id: v.id,
      name: v.name,
      age: v.age,
      position: v.position,
      departmentId: Number(v.departmentId),
    }).subscribe({
      next: () => this.router.navigate(['/employees']),
     error: (err: HttpErrorResponse) => {
  this.error.set(`Erreur ${err.status} : ${err.error?.message ?? err.statusText}`);
  this.saving.set(false);
},
    });
  }
}