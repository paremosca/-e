import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService
      .logout_Angular()
      .then((response) => {
        console.log(response);
        this.router.navigate(['/login']);
        this.authService.isLoggedIn = observableOf(false);
      })
      .catch((err) => {
        console.log(err);
        this.authService.isLoggedIn = observableOf(false);
      });
  }
}
