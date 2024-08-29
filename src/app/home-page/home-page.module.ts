import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { PromotionFieldComponent } from './home-page/promotion-field/promotion-field.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { FilterComponent } from './home-page/filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoaderComponent } from './home-page/loader/loader.component';
import { CatalogComponent } from './home-page/catalog/catalog.component';
import { CatalogCardComponent } from './home-page/catalog/catalog-card/catalog-card.component';
import { CardModule } from 'primeng/card';
import { TreeModule } from 'primeng/tree';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    HomePageComponent,
    PromotionFieldComponent,
    FilterComponent,
    LoaderComponent,
    CatalogComponent,
    CatalogCardComponent
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    HttpClientModule,
    ProgressSpinnerModule,
    CardModule,
    TreeModule,
    ButtonModule,
    PaginatorModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
