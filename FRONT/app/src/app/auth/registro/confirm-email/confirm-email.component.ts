import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmEmailData } from '../../../modelos/confirmEmailData';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnInit {
  confirmEmailForm = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
  });

  formError!: string;
  confirmEmailError!: string;
  email!: string;
  emailConfirmed!: string;

  get code() {
    return this.confirmEmailForm.controls.code;
  }

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email') as string;
  }

  confirm() {
    this.formError = '';
    this.confirmEmailError = '';

    if (!this.confirmEmailForm.valid) {
      this.confirmEmailForm.markAllAsTouched();
      this.formError = 'Por favor complete el formulario.';
      return;
    }
    const confirmEmailData: ConfirmEmailData = {
      email: this.email,
      code: this.code.value as string,
    };
    this.loginService.confirmEmail(confirmEmailData).subscribe({
      error: err => this.confirmEmailError = err,
      complete: () => {
        this.emailConfirmed = 'Email verificado! Redirigiendo...'
        setTimeout(() => {
          this.router.navigate(['/login']);
          this.confirmEmailForm.reset();
        }, 3000);
      }
    });
  }
}
