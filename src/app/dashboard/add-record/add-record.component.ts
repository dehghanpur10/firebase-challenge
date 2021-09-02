import {Component, OnInit, Output, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subject} from 'rxjs';

import {AddRecordService} from "./add-record.service";

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent implements OnInit, OnDestroy {
  addForm = new FormGroup({
    company: new FormControl(''),
    project: new FormControl(''),
    task: new FormControl(''),
    hours: new FormControl(1)
  });
  company: any[] = []
  project: any[] = []
  task: any[] = []
  companySub: any
  projectSub: any
  taskSub: any
  saveSub: any
  @Output() loading :Subject<boolean> = new Subject();

  constructor(private data: AddRecordService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loading.next(true)
    this.companySub = this.data.getCompany().subscribe(companies => {
      this.company = companies;
    })
  }

  getProject() {
    this.loading.next(true)
    this.addForm.get('project')?.setValue('')
    this.addForm.get('task')?.setValue('')
    this.project = []
    this.task = []
    const companyId = this.addForm.get('company')?.value
    this.projectSub?.unsubscribe()
    this.projectSub = this.data.getProject(companyId).subscribe(projects => {
      this.project = projects;
      this.loading.next(false)
    })
  }

  getTask() {
    this.loading.next(true)
    this.addForm.get('task')?.setValue('')
    this.task = []
    const projectId = this.addForm.get('project')?.value
    this.taskSub?.unsubscribe();
    this.taskSub = this.data.getTask(projectId).subscribe(projects => {
      this.task = projects
      this.loading.next(false)
    })
  }

  save() {
    this.loading.next(true)
    if (this.addForm.valid) {
      const companyId = this.addForm.get('company')?.value;
      const projectId = this.addForm.get('project')?.value;
      const task = this.addForm.get('task')?.value;
      const hours = +this.addForm.get('hours')?.value;
      this.saveSub?.unsubscribe();
      this.saveSub = this.data.saveRecord(companyId, projectId, task, hours).subscribe(() => {
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

  ngOnDestroy() {
    this.companySub?.unsubscribe()
    this.projectSub?.unsubscribe()
    this.taskSub?.unsubscribe()
    this.saveSub?.unsubscribe()
  }

}
