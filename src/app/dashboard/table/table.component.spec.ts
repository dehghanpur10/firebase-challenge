import {TableComponent} from "./table.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TableService} from "./table.service";
import {LoginComponent} from "../../login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Subject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {CommonModule} from "@angular/common";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let snakeBar: MatSnackBar;
  let service: TableService;
  let dataSubject: Subject<unknown>;
  beforeEach(() => {
    const snakeBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const serviceSpy = jasmine.createSpyObj('TableService', ['fetchData', 'deleteRecord'])

    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [CommonModule,SharedModule],
      providers: [
        {provide: MatSnackBar, useValue: snakeBarSpy},
        {provide: TableService, useValue: serviceSpy},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);

    snakeBar = fixture.debugElement.injector.get(MatSnackBar)
    service = fixture.debugElement.injector.get(TableService)

    component = fixture.componentInstance;
    component.loading = new Subject<boolean>()
    dataSubject = new Subject();
    // @ts-ignore
    service.fetchData = () => {
      return dataSubject.asObservable()
    }
    fixture.detectChanges();
  });
  it('should be set record', () => {
    const data = [
      {id: '1'},
      {id: '2'}
    ]
    component.ngOnInit()

    dataSubject.next(data)

    expect(component.listLength).toEqual(data.length)
  })
  it('should be delete last record', async () => {
    const data = [
      {id: '1'},
    ]
    dataSubject.next(data)
    service.deleteRecord = (id) => {
      return Promise.resolve()
    }
    await component.deleteRecord('')
    expect(snakeBar.open).toHaveBeenCalledWith('record removed', '', {
      duration: 5000
    })
  })
  it('should delete record',async ()=>{
    service.deleteRecord = (id) => {
      return Promise.resolve()
    }
    await component.deleteRecord('')
    expect(snakeBar.open).toHaveBeenCalledWith('record removed', '', {
      duration: 5000
    })
  })
})
