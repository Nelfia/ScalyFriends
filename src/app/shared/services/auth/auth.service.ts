import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_BASE_URL} from "../../constants/constants";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(username:string, pwd: string) {
    return this.http.post<any>(API_BASE_URL + 'users/login', {username, pwd}).pipe(
      tap((resultat) => console.log("Résultat de la requête : ",resultat))
    );
  }
}
