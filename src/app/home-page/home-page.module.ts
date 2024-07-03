import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { PromotionFieldComponent } from './home-page/promotion-field/promotion-field.component';

@NgModule({
  declarations: [
    HomePageComponent,
    PromotionFieldComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
