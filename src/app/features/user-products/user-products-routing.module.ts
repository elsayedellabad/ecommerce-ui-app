import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProductsComponent } from './components/user-products/user-products.component';
import { UserProductsContainerComponent } from './components/user-products-container/user-products-container.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NormalUserGuard } from 'src/app/core/guards/normal-user.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/products',
    pathMatch: 'full',
  },
  {
    path: 'user',
    canActivate: [AuthGuard, NormalUserGuard],
    component: UserProductsContainerComponent,
    children: [
      {
        path: 'products',
        component: UserProductsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProductsRoutingModule {}
