import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ICardsInfo, ProfileService } from '../../profile.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit, OnDestroy {
  public allCategory!: string[];
  public colors!: string[];
  public selectedName!: string;
  public selectedPrice!: string;
  public selectedDescription!: string;
  public selectedImage!: string;
  public selectedCategory!: string;
  public selectedMode!: string;
  public selectedColor!: string;
  public error: boolean = false;

  private subscription !: Subscription;

  constructor(private profileServise: ProfileService) { }

  ngOnInit() {
    this.subscription = this.profileServise.getFilters().subscribe(data => {
      this.allCategory = this.extractStrings(data);
      this.colors = data.Color;
      console.log(this.colors)
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  public extractStrings(allFilters: any): string[] {
    let result: string[] = [];

    for (const key in allFilters) {
      if (Array.isArray(allFilters[key])) {
        const filteredArray = allFilters[key].filter((item: string) => item[0] !== '#');
        result = result.concat(filteredArray);
      } else if (typeof allFilters[key] === 'object') {
        result = result.concat(this.extractStrings(allFilters[key]));
      }
    }
    return result;
  }

  public addCard(): void {
    if (!this.selectedName?.trim() ||
      !this.selectedPrice ||
      !this.selectedDescription?.trim() ||
      !this.selectedImage?.trim() ||
      !this.selectedCategory?.trim() ||
      !this.selectedColor?.trim() ||
      !this.selectedMode?.trim() ||
      +this.selectedPrice < 1)
      this.error = true;
    else {
      this.error = false;
      this.selectedCategory = this.profileServise.convertToCamelCase(this.selectedCategory);
      this.profileServise.generateArt((art) => {
        let newCard : ICardsInfo = {
          art: art,
          name: this.selectedName,
          price: +this.selectedPrice,
          description: this.selectedDescription,
          image: [this.selectedImage],
          color: this.selectedColor
        }

        this.profileServise.addCardToFB(this.selectedMode, this.selectedCategory, newCard)
      });
    }
  }
}

