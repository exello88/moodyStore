import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { PromotionFieldComponent } from './home-page/promotion-field/promotion-field.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { FilterComponent } from './home-page/filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@NgModule({
  declarations: [
    HomePageComponent,
    PromotionFieldComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    HttpClientModule,
    ProgressSpinnerModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
