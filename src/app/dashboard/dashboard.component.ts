import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  ngOnInit(): void {
  }

  f() {
    this.auth.signOut()
    this.router.navigate(['/login'])
  }
}
