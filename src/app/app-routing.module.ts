import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page/home-page.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { CartComponent } from './cart/cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist/wishlist.component';

const routes: Routes = [ 
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomePageComponent },
  { path: 'cart', component: CartComponent  },
  { path: 'profile', component: ProfileComponent },
  { path: 'wishlist', component: WishlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
