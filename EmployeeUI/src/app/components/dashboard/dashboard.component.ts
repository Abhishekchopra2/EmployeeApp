import { Component, OnInit, ElementRef  } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['January', 'February', 'March', 'April', 'May', 'June'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [0, 0, 0, 0, 0, 0], label: 'New Joinees Per Month' }
  ];


  public doughnutChartLabels = ['Permanent', 'Contract'];
  public doughnutChartData = [0, 0];
  public doughnutChartType = 'doughnut';

  constructor(private employeeService: EmployeeService, private elementRef: ElementRef) { }

  ngOnInit() {
    //$('.webix_pager').hide(); // to hide the pager on this tab
    this.employeeService.getEmployeeCountByMonth().subscribe((response) => {
      this.barChartData[0].data = response;
    });

    this.employeeService.getEmployeeCountByType().subscribe((response) => {
      this.doughnutChartData = response;
    });
  }
}
