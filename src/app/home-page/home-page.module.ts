import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { PromotionFieldComponent } from './home-page/promotion-field/promotion-field.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { FilterComponent } from './home-page/filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterService, IFilters } from './home-page/filter/filter.service';
import { Observable } from 'rxjs';



export function appInitializer(filterService: FilterService): () => Observable<IFilters> {
  return () => filterService.getFilters();
}

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
  ],
  providers: [
    FilterService,
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [FilterService] }
  ]
})
export class HomePageModule { }
