import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { ProductCardComponent } from './cart/product-card/product-card.component';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ErrorMessageComponent } from './cart/error-message/error-message.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog'; 
import { DialogModule } from 'primeng/dialog';




@NgModule({
  declarations: [
    CartComponent,
    ProductCardComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    ImageModule,
    ButtonModule,
    MessagesModule,
    DynamicDialogModule, 
    DialogModule
  ],
  providers:[DialogService],
  exports: [CartComponent]
})
export class CartModule { }
