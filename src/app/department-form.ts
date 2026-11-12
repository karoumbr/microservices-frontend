import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, min, required } from '@angular/forms/signals';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department-form',
  imports: [FormField],
  template: `
    <h2>Nouveau département</h2>
    <form novalidate (submit)="submit($event)">
      <label>ID
        <input type="number" [formField]="departmentForm.id" />
      </label>
      @if (departmentForm.id().touched() && departmentForm.id().invalid()) {
        @for (e of departmentForm.id().errors(); track $index) {
          <p class="error">{{ e.message }}</p>
        }
      }

      <label>Nom
        <input [formField]="departmentForm.name" />
      </label>
      @if (departmentForm.name().touched() && departmentForm.name().invalid()) {
        @for (e of departmentForm.name().errors(); track $index) {
          <p class="error">{{ e.message }}</p>
        }
      }

      @if (error()) { <p class="error">{{ error() }}</p> }
      <button type="submit" [disabled]="departmentForm().invalid() || saving()">Enregistrer</button>
    </form>
  `,
})
export class DepartmentForm {
  private readonly service = inject(DepartmentService);
  private readonly router = inject(Router);

  protected readonly saving = signal(false);
  protected readonly error = signal('');

  private readonly model = signal({ id: 0, name: '' });

  protected readonly departmentForm = form(this.model, (schema) => {
    min(schema.id, 1, { message: 'L’ID doit être un nombre supérieur ou égal à 1.' });
    required(schema.name, { message: 'Le nom est obligatoire.' });
  });

  protected submit(event: Event) {
    event.preventDefault();
    if (this.departmentForm().invalid()) return;

    this.saving.set(true);
    this.service.add(this.model()).subscribe({
      next: () => this.router.navigate(['/departments']),
     error: (err: HttpErrorResponse) => {
  this.error.set(`Erreur ${err.status} : ${err.error?.message ?? err.statusText}`);
  this.saving.set(false);
},
    });
  }
}