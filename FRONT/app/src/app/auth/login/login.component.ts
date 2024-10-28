import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/loginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  formError!: string;
  loginError!: string;

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  // CONSTRUCTOR
  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService) { }

  login() {
    this.formError = '';
    this.loginError = '';

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      this.formError = 'Por favor complete el formulario.';
      return;
    }
    this.loginService.login(this.loginForm.value as LoginRequest).subscribe(
      {
        error: errorData => {
          if (errorData.message === 'user_not_confirmed') {
            this.router.navigateByUrl(`confirmar-email/${this.email.value}`);
          } else {
            this.loginError = errorData;
          }
        },
        complete: () => {
          this.router.navigateByUrl('/tienda');
          this.loginForm.reset();
        }
      }
    );
  }
}
