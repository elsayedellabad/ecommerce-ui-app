import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsContainerComponent } from './components/admin-products-container/admin-products-container.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NewProductComponent } from './components/admin-new-product/admin-new-product.component';
import { AdminUserGuard } from 'src/app/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/products',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminProductsContainerComponent,
    children: [
      {
        path: 'products',
        component: AdminProductsComponent,
      },
      {
        path: 'new-product',
        component: NewProductComponent,
      },
    ],
    canActivate: [AuthGuard, AdminUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProductsRoutingModule {}
