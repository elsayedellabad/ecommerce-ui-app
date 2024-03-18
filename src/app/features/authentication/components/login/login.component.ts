import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './../../models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { IsUserLoggedInService, LocalStorageService, SessionStorageService } from 'src/app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: String = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private isUserLoggedInService: IsUserLoggedInService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    const token = this.localStorageService.get('token');
    if (token) {
      this.router.navigate(['']);
    }
  }

  onLogin(loginForm: FormGroup) {
    if (loginForm.invalid) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    const user: User = {
      email: loginForm.value.email,
      password: loginForm.value.password,
    };

    if (user.email == 'user' && user.password == 'user'){
      this.localStorageService.set('token', 'user');
      this.isUserLoggedInService.isLoggedIn.next(true);
      this.router.navigate(['ecommerce/user/products']);
    } else if (user.email == 'admin' && user.password == 'admin'){
       this.localStorageService.set('token', 'admin');
       this.isUserLoggedInService.isLoggedIn.next(true);
       this.router.navigate(['ecommerce/admin/products']);
    } else {
      this.errorMessage = 'Wrong username or password';
    }
  }
}
