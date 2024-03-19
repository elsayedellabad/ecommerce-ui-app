import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import { MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import { CardsModule } from 'src/app/shared';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminProductsContainerComponent } from './components/admin-products-container/admin-products-container.component';
import { AdminProductsRoutingModule } from './admin-products-routing.module';
import { MatTableModule } from '@angular/material/table';
import { NewProductComponent } from './components/admin-new-product/admin-new-product.component';;
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UpdateProductComponent } from './components/admin-update-product/admin-update-product.component';
@NgModule({
  declarations: [
    AdminProductsContainerComponent,
    AdminProductsComponent,
    NewProductComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    AdminProductsRoutingModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    CardsModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
})
export class AdminProductsModule {}
