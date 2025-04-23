import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Sign } from '../../model/sign';
import { Role } from '../../model/enums/Role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.css',
})
export class SignComponent {
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
  sign: Sign = {
    email: '',
    password: '',
    role: Role.ADMIN,
  };

  constructor(private userService: UserService, private router: Router) {}

  get email() {
    return this.profileForm.get('email')?.value || '';
  }

  get password() {
    return this.profileForm.get('password')?.value || '';
  }
  onSubmit() {
    const sign: Sign = {
      email: this.email,
      password: this.password,
      role: Role.ADMIN,
    };
    try {
      this.userService.sign(sign);
    } catch (error) {
      throw error;
    }

    this.router.navigate(['/login']);
  }
}
