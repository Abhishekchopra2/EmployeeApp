import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  getAllEmployees(): Promise<Employee[]> {
    return this.httpClient.get<Employee[]>('/api/employee').toPromise();
  }

  updateEmployee(id: number, employee: Employee): Observable<any> {
    return this.httpClient.put('/api/employee/' + id, employee);
  }

  deleteEmployee(id: number): Observable<any>{
    return this.httpClient.delete('/api/employee/' + id);
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post('/api/employee/', employee);
  }

  getEmployeeCountByMonth(): Observable<any> {
    return this.httpClient.get('api/employee/getcount/month');
  }

  getEmployeeCountByType(): Observable<any> {
    return this.httpClient.get('api/employee/getcount/type');
  }
}
