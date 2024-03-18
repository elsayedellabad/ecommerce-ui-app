import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  ALL_PRODUCTS,
  ELECTRONICS_PRODUCTS,
  JEWELERY_PRODUCTS,
  MENS_PRODUCTS,
  WOMENS_PRODUCTS
} from 'src/app/core';
import { UserProductItem } from '../models/user-product-item.model';

@Injectable({
  providedIn: 'root',
})
export class UserProductsService {
  constructor(private http: HttpClient) {}

  getUserProductsByCategory(category: string): Observable<UserProductItem[]> {
    let apiUrl;
    switch (category) {
      case 'all_products':
        apiUrl = ALL_PRODUCTS;
        break;
      case 'electronics':
        apiUrl = ELECTRONICS_PRODUCTS;
        break;
      case 'jewelery':
        apiUrl = JEWELERY_PRODUCTS;
        break;
      case 'mens':
        apiUrl = MENS_PRODUCTS;
        break;
      default:
        apiUrl = WOMENS_PRODUCTS;
        break;
    }
    return this.http.get<UserProductItem[]>(apiUrl);
  }
}
