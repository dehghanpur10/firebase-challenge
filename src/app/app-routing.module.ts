import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import {LoginGuard} from "./login/login.guard";
import {DashboardGuard} from "./dashboard/dashboard.guard";
import {CommonModule} from "@angular/common";
import {TopToolBarComponent} from "./dashboard/top-tool-bar/top-tool-bar.component";
import {AddRecordComponent} from "./dashboard/add-record/add-record.component";
import {TableComponent} from './dashboard/table/table.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [DashboardGuard]},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  declarations: [LoginComponent, DashboardComponent, TopToolBarComponent, AddRecordComponent, TableComponent],
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule, SharedModule, CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
