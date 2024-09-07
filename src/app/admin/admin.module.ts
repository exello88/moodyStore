import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AdminRoutingModule } from './admin-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    AdminRoutingModule,
    InputTextareaModule,
    InputTextModule,
    FormsModule, 
    ProgressSpinnerModule,
    DropdownModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
