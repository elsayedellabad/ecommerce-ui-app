import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-products-container',
  templateUrl: './admin-products-container.component.html',
  styleUrls: ['./admin-products-container.component.scss'],
})
export class AdminProductsContainerComponent {
  constructor(private router: Router) {}
}
