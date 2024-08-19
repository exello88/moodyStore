import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  public message: string = '';

  constructor(public config: DynamicDialogConfig) { }
  
  ngOnInit(){
    this.message = this.config.data.errorMessage;
  }
}
