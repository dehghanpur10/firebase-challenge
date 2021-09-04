import {DashboardComponent} from "./dashboard.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginComponent} from "../login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('DashboardComponent',()=>{
  let component:DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;
  let fireAuthService: AngularFireAuth;
  let snakeBar: MatSnackBar;
  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const fireAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['onAuthStateChanged', 'signOut']);
    const snakeBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [ReactiveFormsModule,CommonModule,SharedModule,],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: AngularFireAuth, useValue: fireAuthSpy},
        {provide: MatSnackBar, useValue: snakeBarSpy},
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    fireAuthService = fixture.debugElement.injector.get(AngularFireAuth);
    router = fixture.debugElement.injector.get(Router);
    snakeBar = fixture.debugElement.injector.get(MatSnackBar)

    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should be set email',async ()=>{
    // @ts-ignore
    fireAuthService.onAuthStateChanged=(callback=>{
      // @ts-ignore
      callback({email:'test@test.com'})
      return Promise.resolve()
    })

    await component.ngOnInit()

    expect(component.email).toBe('test@test.com')
  })

  it('should be set progress state',()=>{
    component.progress = false;
    component.setLoading(true)
    expect(component.progress).toBeTruthy()
    component.setLoading(false)
    expect(component.progress).toBeFalsy()
  })

  it('should be do toggle drawer',  ()=> {
    component.drawer = {
      state: false,
      toggle: function()  {
        this.state = !this.state
      }
    };
    component.toggle();

    expect(component.drawer.state).toBeTruthy()
  });

  it('should be signOut',async ()=>{
    fireAuthService.signOut = ()=>{
      return Promise.resolve()
    }
    await component.singOut()

    expect(router.navigate).toHaveBeenCalledWith(['/login']);

  })
  it('should not be signOut',async ()=>{
    fireAuthService.signOut = ()=>{
      return Promise.reject()
    }
    await component.singOut()

    expect(snakeBar.open).toHaveBeenCalledWith('A problem has occurred','', {duration: 5000});
  })

})
