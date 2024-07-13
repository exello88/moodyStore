import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  public filterIsLoad: boolean = false;

  public filtersLoaded(loaded: boolean) : void {
    this.filterIsLoad = loaded;
  }
}
