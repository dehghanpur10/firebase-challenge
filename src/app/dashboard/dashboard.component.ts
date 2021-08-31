import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  email: string = ''
  @ViewChild('drawer') drawer: any;

  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      // @ts-ignore
      this.email = user.email;
    })
  }

  toggle() {
    this.drawer.toggle()
  }

  f() {
    this.auth.signOut()
    this.router.navigate(['/login'])
  }
}
