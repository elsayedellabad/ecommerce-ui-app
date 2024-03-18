import { Categories } from '../../models/categories.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
  @Output() categorySelectionChanged = new EventEmitter();
  categories: Categories[] = [];
  selected = 'default';
  constructor() {
    this.categories = [
      { value: 'all_products', text: 'All Products' },
      { value: 'electronics', text: 'Electronics' },
      { value: 'jewelery', text: 'Jewelery' },
      { value: 'mens', text: "Men's Clothing" },
      { value: 'womens', text: 'Womens Clothing' },
    ];
  }

  onCategoryChange($event: MatSelectChange) {
    let value = $event.value;
    this.categorySelectionChanged.emit(value);
  }
}
