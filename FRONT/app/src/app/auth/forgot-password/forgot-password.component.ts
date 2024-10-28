import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfirmRecoverPassData } from '../../modelos/confirmRecoverPassData';
import { LoginService } from '../../services/auth/login.service';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {

  recoverForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
  confirmRecoverForm = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatedPassword: ['', [Validators.required]],
  });

  formError!: string;
  recoverError!: string;
  emailSended!: string;
  confirmRecoverError!: string;
  passwordChanged!: string;

  get email() {
    return this.recoverForm.controls.email;
  }
  get code() {
    return this.confirmRecoverForm.controls.code;
  }
  get password() {
    return this.confirmRecoverForm.controls.password;
  }
  get repeatedPassword() {
    return this.confirmRecoverForm.controls.repeatedPassword;
  }


  // CONSTRUCTOR
  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService) { }

  ngOnInit(): void {
    this.repeatedPassword.addAsyncValidators(confirmPasswordValidator(this.password));

    this.password.valueChanges.subscribe(() =>
      this.repeatedPassword.updateValueAndValidity()
    );
  }

  recover() {
    this.formError = '';
    this.recoverError = '';

    if (!this.recoverForm.valid) {
      this.recoverForm.markAllAsTouched();
      this.formError = 'Por favor complete el formulario.';
      return;
    }
    this.loginService.recoverPassword(this.email.value as string).subscribe(
      {
        error: err => this.recoverError = err,
        complete: () => {
          this.emailSended = 'Email enviado, revise su casilla de correo electronicamente electronico';
        }
      }
    );
  }

  confirm() {
    this.formError = '';
    this.confirmRecoverError = '';

    if (!this.confirmRecoverForm.valid) {
      this.recoverForm.markAllAsTouched();
      this.formError = 'Por favor complete el formulario.';
      return;
    }
    const confirmRecoverPassData: ConfirmRecoverPassData = {
      code: this.code.value as string,
      email: this.email.value as string,
      password: this.password.value as string,
    }
    this.loginService.confirmRecoverPassword(confirmRecoverPassData).subscribe(
      {
        error: err => this.confirmRecoverError = err,
        complete: () => {
          this.emailSended = '';
          this.passwordChanged = 'Contraseña modificada! Redirigiendo...'
          setTimeout(() => {
            this.router.navigateByUrl('/login');
            this.recoverForm.reset();
          }, 3000);
        }
      }
    );
  }
}
