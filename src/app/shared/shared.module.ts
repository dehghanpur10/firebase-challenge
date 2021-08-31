import { NgModule } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";


const materialComponents = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatInputModule
]
@NgModule({
  declarations: [],
  imports: [materialComponents],
  exports: [materialComponents]
})
export class SharedModule { }
