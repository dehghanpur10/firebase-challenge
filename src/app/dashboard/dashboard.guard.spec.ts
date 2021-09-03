import {TestBed} from '@angular/core/testing';

import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {DashboardGuard} from "./dashboard.guard";

describe('LoginGuard', () => {
  let guard: DashboardGuard;
  let angularFireAuth: jasmine.SpyObj<AngularFireAuth>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const fireAuthSpy = jasmine.createSpyObj('AngularFireAuth', ['onAuthStateChanged']);

    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: AngularFireAuth, useValue: fireAuthSpy},
        DashboardGuard
      ]
    });
    angularFireAuth = TestBed.inject(AngularFireAuth) as jasmine.SpyObj<AngularFireAuth>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    guard = TestBed.inject(DashboardGuard);

  });

  it('should be not redirect', (done:DoneFn) => {
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
      expect(router.navigate).not.toHaveBeenCalledWith(['/login']);
      expect(state).toBeTruthy()
      done()
    })

  });

  it('should be redirect', (done:DoneFn) => {
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
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      expect(state).toBeFalsy()
      done()
    })

  });

});
