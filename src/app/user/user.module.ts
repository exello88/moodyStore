import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { ButtonModule } from 'primeng/button';
import { UserRoutingModule } from './uer-routing.module';



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
