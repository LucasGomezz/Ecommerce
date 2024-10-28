import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserData } from '../../modelos/userData';
import { LoginService } from '../../services/auth/login.service';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  registroForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    edad: [''],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatedPassword: ['', [Validators.required]],
  });

  formError!: string;
  registroError!: string;

  get name() {
    return this.registroForm.controls.name;
  }

  get email() {
    return this.registroForm.controls.email;
  }

  get password() {
    return this.registroForm.controls.password;
  }

  get repeatedPassword() {
    return this.registroForm.controls.repeatedPassword;
  }

  // CONSTRUCTOR
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.repeatedPassword.addAsyncValidators(confirmPasswordValidator(this.password));

    this.password.valueChanges.subscribe(() =>
      this.repeatedPassword.updateValueAndValidity()
    );
  }

  registro() {
    this.formError = '';
    this.registroError = '';

    if (!this.registroForm.valid) {
      this.registroForm.markAllAsTouched();
      this.formError = 'Por favor complete el formulario.';
      return;
    }
    const userData: UserData = {
      name: this.name.value as string,
      email: this.email.value as string,
      password: this.password.value as string,
    };
    this.loginService.registro(userData).subscribe({
      error: err => this.registroError = err,
      complete: () => {
        this.router.navigate(['/confirmar-email', this.email.value]);
      }
    });
  }
}
