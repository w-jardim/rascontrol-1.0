import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, NgIcon],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  errorMessage = '';

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      if (this.authService.login(username, password)) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Usuário ou senha inválidos';
      }
    }
  }
}
