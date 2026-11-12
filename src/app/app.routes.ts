import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'departments' },
  { path: 'departments', loadComponent: () => import('./department-list').then(m => m.DepartmentList) },
  { path: 'departments/new', loadComponent: () => import('./department-form').then(m => m.DepartmentForm) },
  { path: 'departments/:id', loadComponent: () => import('./department-detail').then(m => m.DepartmentDetail) },
  { path: 'employees', loadComponent: () => import('./employee-list').then(m => m.EmployeeList) },
  { path: 'employees/new', loadComponent: () => import('./employee-form').then(m => m.EmployeeForm) },
  { path: '**', redirectTo: 'departments' },
];