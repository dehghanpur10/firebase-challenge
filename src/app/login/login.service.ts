import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {log} from "util";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogin: boolean = false;

  constructor(private auth: AngularFireAuth) {
    this.isLogin = false;
    this.auth.onAuthStateChanged((user) => {
      this.isLogin = !!user;
    }).then(r => console.log("auth checked"))
  }
}
