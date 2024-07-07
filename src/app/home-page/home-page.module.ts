import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { PromotionFieldComponent } from './home-page/promotion-field/promotion-field.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { FilterComponent } from './home-page/filter/filter.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomePageComponent,
    PromotionFieldComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    HttpClientModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
