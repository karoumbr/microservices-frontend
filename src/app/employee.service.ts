import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, NewEmployee } from './models';

export const EMPLOYEE_URL = '/employee';

@Service()
export class EmployeeService {
  private readonly http = inject(HttpClient);

  add(e: NewEmployee): Observable<Employee> {
    return this.http.post<Employee>(EMPLOYEE_URL, e);
  }
}