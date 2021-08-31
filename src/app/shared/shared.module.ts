import { NgModule } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {CommonModule} from "@angular/common";


const materialComponents = [
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule
]
@NgModule({
  declarations: [],
  imports: [CommonModule,materialComponents],
  exports: [materialComponents]
})
export class SharedModule { }
