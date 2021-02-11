import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MPService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getmgasinList(): any {
    return this.http.get(this.baseUrl+'/MagsinProduct/find-all');
  }
}