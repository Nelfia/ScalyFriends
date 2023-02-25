import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_BASE_URL} from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  /**
   * Headers HTTP envoyés avec la requête.
   */
  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  constructor(private http: HttpClient) { }

  public uploadImage(image: string, imgTitle: string): Observable<any>{
    return this.http.post<any>(API_BASE_URL + 'api/image-upload', {image, imgTitle}, {headers : this.headers});
  }
}
