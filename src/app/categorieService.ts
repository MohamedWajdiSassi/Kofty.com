import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getCategorieList(): any {
    return this.http.get(this.baseUrl+'/catg/find-all');
  }
  getCategorieByName(nomCatg):any {
    return this.http.get(this.baseUrl+'/catg/findByName/'+nomCatg)


  }
}
