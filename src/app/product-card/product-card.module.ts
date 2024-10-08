import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCardRoutingModule } from './product-card-routing.module';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { ErrorMessageComponent } from './error-message/error-message.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    ProductCardRoutingModule,
    ImageModule,
    ButtonModule,
    CardModule,
    MessagesModule
  ]
})
export class ProductCardModule { }
