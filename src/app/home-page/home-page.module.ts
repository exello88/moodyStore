import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { PromotionFieldComponent } from './home-page/promotion-field/promotion-field.component';
import { HomePageRoutingModule } from './home-page-routing.module';

@NgModule({
  declarations: [
    HomePageComponent,
    PromotionFieldComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
