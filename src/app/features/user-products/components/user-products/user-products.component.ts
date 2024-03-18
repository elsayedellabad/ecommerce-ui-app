import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { CardDataModel, emptyCardData } from 'src/app/shared';
import { UserProductItem } from '../../models/user-product-item.model';
import { UserProductsService } from '../../services/user-products.service';
@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss'],
})
export class UserProductsComponent implements OnInit {
  userProducts: UserProductItem[] = [];
  dataSource!: UserProductItem[];
  length: number = 0;
  pageIndex: number | undefined = 1;
  pageSize: number | undefined = 6;
  previousPageIndex: number | undefined = 0;

  constructor(private userProductsService: UserProductsService) {}

  ngOnInit(): void {
    this.getUserProducts('all_products');
  }

  /**
   * Description. This is the getUserProducts function that get's User Products according to selected category
   * @param {string} category
   *
   */
  public getUserProducts(category: string) {
    this.userProductsService.getUserProductsByCategory(category).subscribe({
      next: (result: UserProductItem[]) => {
        this.length = result.length;
        this.userProducts = result;
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
   * @desc This is the getServerData function handle pagination for top userProducts
   * @param {PageEvent} event
   * @returns {PageEvent} event
   */
  public getServerData(event: PageEvent) {
    if (this.userProducts && Array.isArray(this.userProducts)) {    
        if (event.pageIndex == 0)
          this.dataSource = this.userProducts.slice(0, event.pageSize);
        else
          this.dataSource = this.userProducts.slice(
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

  /**
   * @desc This is the onCategoryChange function that is called when category value changed
   * @param {string} value
   */
  onCategoryChange(value: string) {
    this.getUserProducts(value);
  }

  /**
   * @desc This is the formatCardData function that format products data
   * that will be sent to "app-cards" component
   *
   * @param {UserProductItem} productItem - to rendered in card
   * @returns {CardDataModel}
   */
  formatCardData(productItem: UserProductItem) {
    let cardData = emptyCardData();
    cardData.title = productItem?.title;
    cardData.category = productItem?.category;
    cardData.imageUrl = productItem.image;
    cardData.description = productItem?.description;
    cardData.price = productItem?.price;    
    return cardData;
  }
}
