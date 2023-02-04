import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_BASE_URL} from "../../constants/constants";
import {Router} from "@angular/router";
import {shareReplay, tap} from "rxjs";
import * as moment from "moment";


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

  }
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiresAt = localStorage.getItem("expires_at");
    return moment(expiresAt);
  }
}
