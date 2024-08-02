import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCardRoutingModule } from './product-card-routing.module';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ProductCardRoutingModule,
    ImageModule,
    ButtonModule,
    CardModule
  ]
})
export class ProductCardModule { }
