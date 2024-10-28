import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ChangePassData } from '../../modelos/changePassData';
import { LoginService } from '../../services/auth/login.service';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  changeForm = this.fb.group({
    passwordOld: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatedPassword: ['', [Validators.required]],
  });

  formError!: string;
  changeError!: string;
  passwordChanged!: string;

  get passwordOld() {
    return this.changeForm.controls.passwordOld;
  }

  get password() {
    return this.changeForm.controls.password;
  }

  get repeatedPassword() {
    return this.changeForm.controls.repeatedPassword;
  }

  // CONSTRUCTOR
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.repeatedPassword.addAsyncValidators(confirmPasswordValidator(this.password));

    this.password.valueChanges.subscribe(() =>
      this.repeatedPassword.updateValueAndValidity()
    );
  }

  change() {
    this.formError = '';
    this.changeError = '';

    if (!this.changeForm.valid) {
      this.changeForm.markAllAsTouched();
      this.formError = 'Por favor complete el formulario.';
      return;
    }
    const changePasswordData: ChangePassData = {
      oldPassword: this.passwordOld.value as string,
      newPassword: this.password.value as string,
    }
    this.loginService.changePassword(changePasswordData).subscribe(
      {
        error: err => this.changeError = err,
        complete: () => {
          this.passwordChanged = 'Contraseña cambiada! Redirigiendo...';
          setTimeout(() => {
            this.router.navigateByUrl('/tienda');
          }, 3000);
        }
      }
    );
  }
}

