import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { ProfileRoutingModule } from './profile-routing.module';
import { AuthenticationComponent } from './profile/authentication/authentication.component';
import { ProfileService } from './profile.service';
import { AdminComponent } from './profile/admin/admin.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    ProfileComponent,
    AuthenticationComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    InputTextareaModule,
    InputTextModule,
    FormsModule, 
    DropdownModule,
    ButtonModule
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule { }
