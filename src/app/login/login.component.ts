import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    const email = this.loginForm.get('email')?.value
    const password = this.loginForm.get('password')?.value
    this.auth.signInWithEmailAndPassword(email, password).then(e => {
        return this.router.navigate(['/login'])
      }
    )
  }

}
