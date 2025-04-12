import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Login } from '../../model/login';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule],
  styleUrl: './login.component.css',
})
export class LoginComponent {
  profileForm = new FormGroup({
    email: new FormControl<string | null>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(private userService: UserService) {}

  get email() {
    return this.profileForm.get('email')?.value || '';
  }

  get password() {
    return this.profileForm.get('password')?.value || '';
  }

  onSubmit() {
    const login: Login = {
      email: this.email,
      password: this.password,
    };
    try {
      this.userService.login(login).subscribe({
        next: (response) => {
          // Salva o token no localStorage
          localStorage.setItem('authToken', response.token);
          console.log('Token salvo com sucesso:', response.token);
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
