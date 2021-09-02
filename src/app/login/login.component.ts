import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  progress = false;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth: AngularFireAuth, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  login() {
    this.progress = true;
    const email = this.loginForm.get('email')?.value
    const password = this.loginForm.get('password')?.value

    this.auth.signInWithEmailAndPassword(email, password).then(result => {
        this._snackBar.open("hello " + result.user?.email, '', {
          duration: 5000
        });
      this.progress = false;
      return this.router.navigate(['/login']);
      }
    ).catch(()=>{
      this._snackBar.open("this user not found", '', {
        duration: 5000
      });
      this.progress = false;
    })
  }

}
