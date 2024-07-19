import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { PromotionFieldComponent } from './home-page/promotion-field/promotion-field.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { FilterComponent } from './home-page/filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderComponent } from './home-page/loader/loader.component';
import { TreeModule } from 'primeng/tree';

@NgModule({
  declarations: [
    HomePageComponent,
    PromotionFieldComponent,
    FilterComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    HttpClientModule,
    ProgressSpinnerModule,
    TreeModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
