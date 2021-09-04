import {AddRecordComponent} from "./add-record.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddRecordService} from "./add-record.service";
import {SharedModule} from "../../shared/shared.module";
import {Subject} from "rxjs";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";


describe('AddRecordComponent', () => {
  let component: AddRecordComponent;
  let fixture: ComponentFixture<AddRecordComponent>;
  let snakeBar: MatSnackBar;
  let service: AddRecordService;
  let companySub: Subject<any[]>;
  beforeEach(() => {
    const snakeBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const serviceSpy = jasmine.createSpyObj('AddRecordService', ['getCompany', 'getProject', 'getTask', 'saveRecord'])

    TestBed.configureTestingModule({
      declarations: [AddRecordComponent],
      imports: [CommonModule,ReactiveFormsModule,SharedModule],
      providers: [
        {provide: MatSnackBar, useValue: snakeBarSpy},
        {provide: AddRecordService, useValue: serviceSpy},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecordComponent);

    snakeBar = fixture.debugElement.injector.get(MatSnackBar)
    service = fixture.debugElement.injector.get(AddRecordService)
    companySub = new Subject();
    // @ts-ignore
    service.getCompany = () => {
      return companySub.asObservable()
    }
    component = fixture.componentInstance;

    fixture.detectChanges();
  })

  it('should be get company', () => {
    const companies = [
      {id: '1'},
      {id: '2'},
    ]
    component.ngOnInit()
    companySub.next(companies)

    expect(component.company).toEqual(companies)
  })
  it('should be get project of company', () => {
    const projects = [
      {id: '1'},
      {id: '2'},
    ]
    const projectSub = new Subject()
    // @ts-ignore
    service.getProject = (id) => {
      return projectSub.asObservable()
    }

    component.getProject()
    projectSub.next(projects)

    expect(component.project).toEqual(projects)
  })
  it('should be get task of project', () => {
    const tasks = [
      {id: '1'},
      {id: '2'},
    ]
    const taskSub = new Subject()
    // @ts-ignore
    service.getTask = (id) => {
      return taskSub.asObservable()
    }

    component.getTask()
    taskSub.next(tasks)

    expect(component.task).toEqual(tasks)
  })
  it('should be saved',()=>{
    component.addForm.get('company')?.setValue('1')
    component.addForm.get('project')?.setValue('1')
    component.addForm.get('task')?.setValue('1')

    const saveSub = new Subject()
    // @ts-ignore
    service.saveRecord = (c,p,t,h) => {
      return saveSub.asObservable()
    }

    component.save()
    saveSub.next('')

    expect(snakeBar.open).toHaveBeenCalledWith('record saved','', {duration: 5000});
  })

  it('should not be saved', () => {
    component.addForm.setErrors({'incorrect': true})
    component.save()
    expect(snakeBar.open).toHaveBeenCalledWith('please fill all input','', {duration: 5000});

  })


})
