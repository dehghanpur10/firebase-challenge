import {Component, OnInit, Output, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subject} from 'rxjs';
import {first} from 'rxjs/operators';

import {AddRecordService} from "./add-record.service";

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent implements OnInit {
  addForm = new FormGroup({
    company: new FormControl(''),
    project: new FormControl(''),
    task: new FormControl(''),
    hours: new FormControl(1)
  });
  company: any[] = []
  project: any[] = []
  task: any[] = []

  @Output() loading :Subject<boolean> = new Subject();

  constructor(private data: AddRecordService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loading.next(true)
    this.data.getCompany().pipe(first()).subscribe(companies => {
      this.company = companies;
    })
  }

  getProject() {
    this.loading.next(true)
    // @ts-ignore
    this.addForm.get('project').setValue('')
    // @ts-ignore
    this.addForm.get('task').setValue('')
    this.project = []
    this.task = []
    // @ts-ignore
    const companyId = this.addForm.get('company').value
    this.data.getProject(companyId).pipe(first()).subscribe(projects => {
      this.project = projects;
      this.loading.next(false)
    })
  }

  getTask() {
    this.loading.next(true)
    // @ts-ignore
    this.addForm.get('task').setValue('')
    this.task = []
    // @ts-ignore
    const projectId = this.addForm.get('project').value
    this.data.getTask(projectId).pipe(first()).subscribe(projects => {
      this.task = projects
      this.loading.next(false)
    })
  }
  save() {
    this.loading.next(true)
    if (this.addForm.valid) {
      // @ts-ignore
      const companyId = this.addForm.get('company').value;
      // @ts-ignore
      const projectId = this.addForm.get('project').value;
      // @ts-ignore
      const task = this.addForm.get('task').value;
      // @ts-ignore
      const hours = +this.addForm.get('hours').value;
     this.data.saveRecord(companyId, projectId, task, hours).pipe(first()).subscribe(() => {
        this._snackBar.open('record saved', '', {
          duration: 5000
        })
      })

    } else {
      this._snackBar.open('please fill all input', '', {
        duration: 5000
      })
      this.loading.next(false)
    }
  }



}
