import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  host: { ngSkipHydration: 'true' },
})
export class CarouselComponent implements OnChanges {
  @Input() products: any[] = [];
  @Input() userLogged: boolean = false;
  @Input() genero?: string;
  @Input() numVisible: number = 3;

  filteredProducts: any[] = [];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] || changes['genero']) {
      this.filterProducts();
      if (this.genero) {
        this.numVisible = 5;
      } else {
        this.numVisible = 3;
      }
    }
  }

  private filterProducts(): void {
    if (this.genero) {
      this.filteredProducts = this.products.filter(
        (product) => product.genero === this.genero
      );
    } else {
      this.filteredProducts = this.products.slice(0, 10);
    }
  }
}
