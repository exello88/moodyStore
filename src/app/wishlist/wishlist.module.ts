import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistCardComponent } from './wishlist/wishlist-card/wishlist-card.component';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { ErrorMessageComponent } from './wishlist/error-message/error-message.component';
import { PaginatorModule } from 'primeng/paginator';



@NgModule({
  declarations: [
    WishlistComponent,
    WishlistCardComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    ImageModule, 
    ButtonModule,
    MessagesModule,
    CardModule,
    DynamicDialogModule, 
    HttpClientModule,
    DialogModule,
    PaginatorModule
  ]
})
export class WishlistModule { }
