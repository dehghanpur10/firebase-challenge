import {ComponentFixture, TestBed} from "@angular/core/testing";
import {LoginComponent} from "./login.component";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let fireAuthService: AngularFireAuth;
  let snakeBar: MatSnackBar;
  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const fireAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['signInWithEmailAndPassword']);
    const snakeBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, SharedModule],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: AngularFireAuth, useValue: fireAuthSpy},
        {provide: MatSnackBar, useValue: snakeBarSpy},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);

    router = fixture.debugElement.injector.get(Router);
    fireAuthService = fixture.debugElement.injector.get(AngularFireAuth);
    snakeBar = fixture.debugElement.injector.get(MatSnackBar)

    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should be login', async () => {
    // @ts-ignore
    fireAuthService.signInWithEmailAndPassword = (email, password) => {
      return Promise.resolve({user: {email: 'test@test.com'}})
    }
    await component.login()

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    // @ts-ignore
    expect(snakeBar.open).toHaveBeenCalledWith('hello test@test.com','', {duration: 5000});

  })
  it('should be not login', async () => {
    // @ts-ignore
    fireAuthService.signInWithEmailAndPassword = (email, password) => {
      return Promise.reject({user: {email: 'test@test.com'}})
    }
    await component.login()

    expect(router.navigate).not.toHaveBeenCalledWith(['/dashboard']);
    // @ts-ignore
    expect(snakeBar.open).toHaveBeenCalledWith("this user not found",'', {duration: 5000});

  })
})
