import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Genero } from '../modelos/genero.model';
import { UserData } from '../modelos/userData';
import { LoginService } from '../services/auth/login.service';
import { GeneroService } from '../services/genero/genero.service';
import { ProductService } from '../services/product/product.service';
import { CarouselComponent } from '../shared/carousel/carousel.component';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, RouterModule, CarouselComponent],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent implements OnInit {
  products: any[] = [];
  productosEnOferta: any[] = [];
  generos: Genero[] = [];

  userLogged = false;
  userData?: UserData;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private productService: ProductService,
    private generoService: GeneroService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.productosEnOferta = this.products.slice(0, 3);
    });

    this.generoService.getGeneros().subscribe((data: Genero[]) => {
      this.generos = data;
    });

    this.loginService.userData.subscribe({
      next: (userData: UserData) => (this.userData = userData),
    });
  }
}
