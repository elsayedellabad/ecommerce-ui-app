import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { IsUserLoggedInService, LocalStorageService } from './core';
import { User } from './features/authentication/models/user';
import { AuthenticationService } from './features/authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isUserLoggedIn = false;
  refreshTokenSub$: Subscription = new Subscription();
  constructor(
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService,
    private isUserLoggedInService: IsUserLoggedInService
  ) {}

  ngOnInit(): void {   
    this.isUserLoggedInService.isLoggedIn.subscribe((value: any) => {
      this.isUserLoggedIn = value;
    });
    const token = this.localStorageService.get('token');
    if (token) {
      this.isUserLoggedIn = true;
    }
  }

}
