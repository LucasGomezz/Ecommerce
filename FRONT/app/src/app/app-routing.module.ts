import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaComponent } from './tienda/tienda.component';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/tienda', pathMatch: 'full' },
  { path: 'tienda', component:TiendaComponent },
  { path: 'login', component:LoginComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
