import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAuth, noAuth, userAuth } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home-page/home-page.module').then(module => module.HomePageModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(module => module.CartModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule), canActivate: [adminAuth] },
  { path: 'user', loadChildren: () => import('./user/user.module').then(module => module.UserModule), canActivate: [userAuth] },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(module => module.AuthenticationModule), canActivate: [ noAuth ] },
  { path: 'wishlist', loadChildren: () => import('./wishlist/wishlist.module').then(module => module.WishlistModule) },
  { path: 'product/:art', loadChildren: () => import('./product-card/product-card.module').then(module => module.ProductCardModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
