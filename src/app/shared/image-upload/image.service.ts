import {Injectable} from '@angular/core';
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

  public uploadImage(image: string): Observable<string>{
    return this.http.post<string>(API_BASE_URL + 'api/image-upload', {image}, {headers : this.headers});
  }
}
