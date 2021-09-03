import {TestBed} from '@angular/core/testing';

import {LoginGuard} from './login.guard';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let angularFireAuth: jasmine.SpyObj<AngularFireAuth>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const fireAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['onAuthStateChanged']);

    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: AngularFireAuth, useValue: fireAuthSpy},
        LoginGuard
      ]
    });
    angularFireAuth = TestBed.inject(AngularFireAuth) as jasmine.SpyObj<AngularFireAuth>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    guard = TestBed.inject(LoginGuard);

  });

  it('should be not redirect', (done:DoneFn) => {
    // @ts-ignore
    angularFireAuth.onAuthStateChanged = (callback)=>{
      // @ts-ignore
      callback(undefined)
      return Promise.resolve()
    }
    // @ts-ignore
    const d = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    // @ts-ignore
    d.then(state => {
      expect(router.navigate).not.toHaveBeenCalledWith(['/dashboard']);
      expect(state).toBeTruthy()
      done()
    })

  });

  it('should be redirect', (done:DoneFn) => {
    // @ts-ignore
    angularFireAuth.onAuthStateChanged = (callback)=>{
      // @ts-ignore
      callback('user')
      return Promise.resolve()
    }
    // @ts-ignore
    const d = guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    // @ts-ignore
    d.then(state => {
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
      expect(state).toBeFalsy()
      done()
    })

  });

});
