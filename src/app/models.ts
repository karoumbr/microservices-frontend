export interface Employee {
  id?: number;
  departmentId: number;
  name: string;
  age: number;
  position: string;
}

export interface Department {
  id?: number;
  name: string;
  employees?: Employee[];
}

export type NewEmployee = Omit<Employee, 'id'> & { id: number };
export type NewDepartment = Omit<Department, 'id' | 'employees'> & { id: number };