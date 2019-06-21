import { Component, Input, ElementRef, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'datatable',
  template: ""
})
export class DatatableComponent implements OnDestroy, OnInit {
  private ui: webix.ui.datatable;
  @Output() onRowSelect = new EventEmitter<Employee>();

  constructor(private employeeService: EmployeeService, root: ElementRef) {
    this.ui = <webix.ui.datatable>webix.ui({
      container: root.nativeElement,
      view: "datatable", autoConfig: true, data: this.employeeService.getAllEmployees(),
      on: {
        onAfterSelect: (id) => this.onRowSelect.emit(this.ui.getItem(id))
      },
      columnWidth: 300,
      pager: {
        size: 5
      }
    })
  }

  addRow() {
    this.ui.add({ title: "New row" });
  }
  updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee.Id, employee).subscribe((res) => {
      this.ui.updateItem(employee.id, employee);
    });
  }

  removeEmployee(employee: Employee) {
    this.employeeService.deleteEmployee(employee.Id).subscribe((res) => {
      this.ui.remove(employee.id);
    });
  }

  addEmployee(employee: Employee) {
    this.employeeService.addEmployee(employee).subscribe((res) => {
      window.location.reload();
    });
  }

  ngOnInit() {
    this.ui.resize();
  }
  ngOnDestroy() {
    this.ui.destructor();
  }
}
