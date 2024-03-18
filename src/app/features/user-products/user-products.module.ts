import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select'
import { UserProductsRoutingModule } from './user-products-routing.module';
import { UserProductsComponent } from './components/user-products/user-products.component';
import { UserProductsContainerComponent } from './components/user-products-container/user-products-container.component';
import { CategoryFilterComponent } from 'src/app/shared/components/category-filter/category-filter.component';
import { CardsModule } from 'src/app/shared/modules/cards/cards.module';

@NgModule({
  declarations: [
    UserProductsComponent,
    UserProductsContainerComponent,
    CategoryFilterComponent,
  ],
  imports: [
    CommonModule,
    UserProductsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    CardsModule,
  ],
})
export class UserProductsModule {}
