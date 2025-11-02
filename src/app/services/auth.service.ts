import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginInput } from '../interfaces/userLoginInput';
import { Observable, Subscription, tap } from 'rxjs';
import { RequestResult } from '../interfaces/requestResult';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '../interfaces/tokenPayload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private apiUrl = 'https://localhost:7070/api/authentication/login';

  constructor(private http: HttpClient) { }

  login(input: UserLoginInput): Observable<RequestResult<string>> {
    return this.http.post<RequestResult<string>>(this.apiUrl, input)
      .pipe(
        tap(resp => {
          if (resp.success){
            localStorage.setItem(this.tokenKey, resp.data!);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return false;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000); // segundos unix

      const notExpired = decoded.exp > currentTime;
      const issuerValid = decoded.iss === 'Portal.Usuario.API';
      const audienceValid = decoded.aud === 'Portal.Usuario.API';

      return notExpired && issuerValid && audienceValid;
    } catch (e) {
      // token mal formado ou não é JWT
      return false;
    }
  }
}