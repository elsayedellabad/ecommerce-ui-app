import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-products-container',
  templateUrl: './user-products-container.component.html',
  styleUrls: ['./user-products-container.component.scss'],
})
export class UserProductsContainerComponent {
  constructor(private router: Router) {}
}
