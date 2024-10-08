import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../authentication/authentication.service';
import { ICardsInfo } from '../admin.service';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
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
  public paginationStatus: boolean = false;

  private subscription !: Subscription;

  constructor(private appComponent: AppComponent, private adminService: AdminService, private authServise: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.adminService.getFilters().subscribe(data => {
      this.allCategory = this.extractStrings(data);
      this.colors = data.Color;
    });
  }

  ngOnDestroy() {
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
    this.paginationStatus = true;

    if (!this.selectedName?.trim() ||
      !this.selectedPrice ||
      !this.selectedDescription?.trim() ||
      !this.selectedImage?.trim() ||
      !this.selectedCategory?.trim() ||
      !this.selectedColor?.trim() ||
      !this.selectedMode?.trim() ||
      +this.selectedPrice < 1) {
      this.error = true;
      this.paginationStatus = false;
    }
    else {
      this.error = false;
      this.selectedCategory = this.adminService.convertToCamelCase(this.selectedCategory);
      this.adminService.generateArt((art) => {
        let newCard: ICardsInfo = {
          art: art,
          name: this.selectedName,
          price: +this.selectedPrice,
          description: this.selectedDescription,
          image: [this.selectedImage],
          color: this.selectedColor
        }

        this.adminService.addCardToFB(this.selectedMode, this.selectedCategory, newCard)

        this.paginationStatus = false;
      });
    }
  }

  public logOut(): void {
    this.authServise.admin = false;
    this.authServise.auth = false;
    this.authServise.email = '';
    this.appComponent.setEmail();
    this.router.navigate(['/authentication']);
  }
}
