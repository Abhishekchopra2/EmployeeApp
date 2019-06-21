import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'employee-list', component: EmployeeTableComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: EmployeeTableComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DatatableComponent,
    EmployeeTableComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
