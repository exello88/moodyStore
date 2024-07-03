import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', loadChildren: () => import('./home-page/home-page.module').then(module => module.HomePageModule)  },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(module => module.CartModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(module => module.ProfileModule) },
  { path: 'wishlist', loadChildren: () => import('./wishlist/wishlist.module').then(module => module.WishlistModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
