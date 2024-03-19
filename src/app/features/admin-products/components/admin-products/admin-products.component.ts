import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { AdminProductItem } from './../../models/admin-product-item.model';
import { emptyCardData, SpinnerService } from 'src/app/shared';
import { LocalStorageService } from 'src/app/core';
import { AdminProductsService } from '../../services/admin-products.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'price',
    'description',
    'category',
    'actions',
  ];
  products: AdminProductItem[] = [];
  dataSource!: AdminProductItem[];
  length: number = 0;
  pageIndex: number | undefined = 1;
  pageSize: number | undefined = 6;
  previousPageIndex: number | undefined = 0;
  constructor(
    private adminProductsService: AdminProductsService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAdminProducts();
  }

  /**
   * Description. This is the getAdminProducts function that get's Admin User Products according to selected category
   * @param {string} category
   *
   */
  public getAdminProducts() {
    this.adminProductsService.getAdminProducts().subscribe({
      next: (result: AdminProductItem[]) => {
        // console.log('@result >> ', result);
        this.length = result.length;
        this.products = result;
        this.dataSource = this.products;
        this.getServerData({
          length: this.length,
          pageIndex: 0,
          pageSize: 6,
          previousPageIndex: this.previousPageIndex,
        });
      },
      error: (e) => {
        console.log(e.error['message']);
      },
    });
  }

  /**
   * @desc This is the getServerData function handle pagination for Admin Products
   * @param {PageEvent} event
   * @returns {PageEvent} event
   */
  public getServerData(event: PageEvent) {
    if (this.products && Array.isArray(this.products)) {
      if (event.pageIndex == 0)
        this.dataSource = this.products.slice(0, event.pageSize);
      else
        this.dataSource = this.products.slice(
          event.pageIndex * event.pageSize,
          (event.pageIndex + 1) * event.pageSize
        );
    } else {
      // Handle the case where this.products is not an array (log error, return empty data)
      console.error('this.products is not an array');
      this.dataSource = [];
    }
    this.pageIndex = event?.pageIndex;
    this.pageSize = event?.pageSize;
    this.previousPageIndex = event?.previousPageIndex;

    return event;
  }

  deleteProduct(prodId: number) {
    this.adminProductsService.deleteProduct(prodId).subscribe({
      next: (result) => {
        this.products = this.products.filter((el) => el.id != prodId);
        this.getServerData({
          length: this.length,
          pageIndex: 0,
          pageSize: 6,
          previousPageIndex: this.previousPageIndex,
        });
        console.log('Product Deleted Successfully!');
      },
      error: (e) => {
        console.log(e.error['message']);
      },
    });
  }

  updateProduct(product: any) {
    this.adminProductsService.selectedProduct = product;
    this.router.navigateByUrl('/ecommerce/admin/update-product');
  }
}
