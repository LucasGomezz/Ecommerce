import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { NavComponent } from "./shared/nav/nav.component";
import { TiendaComponent } from "./tienda/tienda.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterOutlet,
    HeaderComponent,
    TiendaComponent,
    FooterComponent,
    NavComponent,
  ],
})
export class AppComponent {
  title = 'app';
}
