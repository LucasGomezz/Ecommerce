import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  userLoggedIn!: boolean;
  itemsInCart!: number;
  userName!: string;

  constructor(private loginService: LoginService, private router: Router, private cartService: CartService) { }

  async ngOnInit(): Promise<void> {
    this.cartService.cartProducts.subscribe(products => this.itemsInCart = products.length);
    this.loginService.userLoggedIn.subscribe(userLoggedIn => this.userLoggedIn = userLoggedIn);
    this.loginService.userData.subscribe(userData => this.userName = userData.name ?? 'Usuario');
  }

  logout() {
    this.loginService.logout().subscribe(() => this.router.navigateByUrl('/tienda'));
  }
}
