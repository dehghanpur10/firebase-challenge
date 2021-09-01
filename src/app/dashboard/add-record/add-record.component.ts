import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AddRecordService} from "./add-record.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  progress: boolean = false

  constructor(private data: AddRecordService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.progress = true;
    this.data.getCompany().subscribe(companies => {
      this.company = companies;
      this.progress = false;
    })
  }

  getProject() {
    this.progress = true;
    this.addForm.get('project')?.setValue('')
    this.addForm.get('task')?.setValue('')
    this.project = []
    this.task = []
    const companyId = this.addForm.get('company')?.value
    this.data.getProject(companyId).subscribe(projects => {
      this.project = projects;
      this.progress = false;
    })
  }

  getTask() {
    this.progress = true;
    this.addForm.get('task')?.setValue('')
    this.task = []
    const projectId = this.addForm.get('project')?.value
    this.data.getTask(projectId).subscribe(projects => {
      this.task = projects
      this.progress = false;
    })
  }

  save() {
    this.progress = true;
    if (this.addForm.valid) {
      const companyId = this.addForm.get('company')?.value;
      const projectId = this.addForm.get('project')?.value;
      const task = this.addForm.get('task')?.value;
      const hours = +this.addForm.get('hours')?.value;

      this.data.saveRecord(companyId, projectId, task, hours).subscribe(() => {
        this._snackBar.open('record saved', '', {
          duration: 5000
        })
        this.progress = false;
      })
    } else {
      this._snackBar.open('please fill all input', '', {
        duration: 5000
      })
      this.progress = false;

    }
  }
}
