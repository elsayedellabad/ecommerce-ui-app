import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ALL_PRODUCTS, API_KEY } from 'src/app/core';
import { AdminProductItem } from './../models/admin-product-item.model';
@Injectable({
  providedIn: 'root',
})
export class AdminProductsService {
  constructor(private http: HttpClient) {}

  getAdminProducts(): Observable<AdminProductItem[]> {
    let apiUrl = ALL_PRODUCTS;
    return this.http.get<AdminProductItem[]>(apiUrl);
  }

  saveNewProduct(newProduct:any) {
    let apiUrl = 'https://fakestoreapi.com/products';
    return this.http.post(apiUrl, newProduct);
  }

  deleteProduct(productId: number) {
    let apiUrl = 'https://fakestoreapi.com/products/';
    return this.http.delete(apiUrl + productId);
  }
}
