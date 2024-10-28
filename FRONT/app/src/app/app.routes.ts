import { Routes } from '@angular/router';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { ConfirmEmailComponent } from './auth/registro/confirm-email/confirm-email.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductoComponent } from './producto/producto.component';
import { authGuard, loginGuard } from './services/auth/auth.guard';
import { TiendaComponent } from './tienda/tienda.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tienda', pathMatch: 'full' },
  { path: 'tienda', component: TiendaComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'carrito', component: CartComponent },
  { path: 'agregar-producto', component: AgregarProductoComponent },
  { path: 'confirmar-email/:email', component: ConfirmEmailComponent },
  { path: 'cambiar-contrasenia', component: ChangePasswordComponent, canActivate: [authGuard] },
  { path: 'recuperar-contrasenia', component: ForgotPasswordComponent, canActivate: [loginGuard] },
];
