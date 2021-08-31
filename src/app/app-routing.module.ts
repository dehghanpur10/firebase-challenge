import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations:[LoginComponent],
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule,SharedModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
