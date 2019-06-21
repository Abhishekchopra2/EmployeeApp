import { Component, ViewChild } from '@angular/core';
import { DatatableComponent } from "../datatable/datatable.component";
import { Employee } from "../../models/employee";

@Component({
  selector: 'app-employee-table',
  template: `
          <button type="button" (click)="addEmployee()">Want to add new</button>
            <form class="formbox" *ngIf="selectedEmployee">
              <input  [(ngModel)]="selectedEmployee.Name" placeholder="Name" name="name"/>
              <input  [(ngModel)]="selectedEmployee.Email" placeholder="Email" name="email"/> 
              <button type="button" (click)="saveEmployee()">Update</button>
              <button type="button" (click)="deleteEmployee()">Delete</button>
            </form>
            <form class="formbox" *ngIf="isNewRecord">
              <input  [(ngModel)]="newEmployee.Name" placeholder="Name" name="name"/>
              <input  [(ngModel)]="newEmployee.Email" placeholder="Email" name="email"/> 
              <button type="button" (click)="SaveNewEmployee()">Add</button>
              <button type="button" (click)="cancel()">Cancel</button>
            </form>
            <datatable (onRowSelect)="fillInfo($event)" class='pagebox'></datatable>`
})
export class EmployeeTableComponent {
  @ViewChild(DatatableComponent) grid: DatatableComponent;
  private selectedEmployee: Employee;
  private newEmployee: Employee;
  private isNewRecord: boolean = false;

  fillInfo(employee: Employee) {
    this.selectedEmployee = employee;
    this.isNewRecord = false;
  }

  saveEmployee() {
    this.grid.updateEmployee(this.selectedEmployee);
  }

  SaveNewEmployee() {
    this.grid.addEmployee(this.newEmployee);
  }

  deleteEmployee() {
    this.grid.removeEmployee(this.selectedEmployee);
  }
  cancel() {
    this.isNewRecord = false;
  }
  addEmployee() {
    this.isNewRecord = true;
    this.selectedEmployee = null;
    this.newEmployee = new Employee();
  }
}
