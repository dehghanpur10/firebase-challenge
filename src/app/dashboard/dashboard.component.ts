import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  email: string = ''
  progress: boolean = false;
  @ViewChild('drawer') drawer: any;

  constructor(private auth: AngularFireAuth, private router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      // @ts-ignore
      this.email = user.email;
    }).then()
  }

  setLoading(state: boolean) {
    this.progress = state;
  }

  toggle() {
    this.drawer.toggle()
  }

  singOut() {
    this.auth.signOut().then(r => {
      this.router.navigate(['/login'])
    }).catch(e => {
      this._snackBar.open('There is a problem', '', {
        duration: 5000
      })
    })
  }
}
