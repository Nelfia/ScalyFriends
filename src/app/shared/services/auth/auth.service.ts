import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_BASE_URL} from "../../constants/constants";
import {Router} from "@angular/router";
import {shareReplay, tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  constructor(private http: HttpClient, private router: Router) { }

  login(username:string, pwd: string) {
    return this.http.post<any>(API_BASE_URL + 'api/users/login', {username, pwd}, {headers: this.headers})
      .pipe(
        tap((res) => {
          this.setSession(res);
        }),
        shareReplay(1)
    );
  }
  private setSession(res: any) {
    localStorage.setItem('id_token', JSON.parse(res.idToken));
    localStorage.setItem('expires_at', res.expires);
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('id_cart', res.user.idCart);
  }
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem('user');
    localStorage.removeItem('id_cart');
  }
  public isLoggedIn() {
    let expiresAt = Number(this.getExpiration());
    console.log((Date.now()/1000) < expiresAt)
    return (Date.now()/1000) < expiresAt;
  }

  getExpiration() {
    return localStorage.getItem("expires_at");
  }
}
