import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { ProductCardComponent } from './cart/product-card/product-card.component';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';



@NgModule({
  declarations: [
    CartComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ImageModule,
    ButtonModule,
    MessagesModule
  ],
  exports: [CartComponent]
})
export class CartModule { }
