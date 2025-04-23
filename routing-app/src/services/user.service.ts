import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/login';
import { Sign } from '../model/sign';
import { Observable } from 'rxjs';
import { LoginResponse } from '../model/LoginResponse';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  login(login: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `http://localhost:8080/users/login`,
      login
    );
  }

  sign(sign: Sign) {
    return this.http.post<void>(`http://localhost:8080/users`, sign);
  }
}
