import { NgModule } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";



const materialComponents = [
  MatButtonModule,
  MatIconModule,
  MatCardModule
]
@NgModule({
  declarations: [],
  imports: [materialComponents],
  exports: [materialComponents]
})
export class SharedModule { }
