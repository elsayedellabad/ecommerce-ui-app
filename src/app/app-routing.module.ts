import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard, PageNotFoundComponent } from './core';
import { AdminUserGuard } from './core/guards/admin-user.guard';
import { NormalUserGuard } from './core/guards/normal-user.guard';

const appRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard, NormalUserGuard],
    loadChildren: () =>
      import('./features/user-products/user-products.module').then(
        (m) => m.UserProductsModule
      ),
  },
  {
    path: 'auth',
    canActivate: [],
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'ecommerce',
    canActivate: [AuthGuard, NormalUserGuard],
    loadChildren: () =>
      import('./features/user-products/user-products.module').then(
        (m) => m.UserProductsModule
      ),
  },
  {
    path: 'ecommerce',
    canActivate: [AuthGuard, AdminUserGuard],
    loadChildren: () =>
      import('./features/admin-products/admin-products.module').then(
        (m) => m.AdminProductsModule
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
