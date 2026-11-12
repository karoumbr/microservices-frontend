import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department, NewDepartment } from './models';

export const DEPARTMENT_URL = '/department';

@Service()
export class DepartmentService {
  private readonly http = inject(HttpClient);

  add(d: NewDepartment): Observable<Department> {
    return this.http.post<Department>(DEPARTMENT_URL, d);
  }
}