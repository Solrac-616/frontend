import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string;
  private productsUrl: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiEndpoint;
    this.productsUrl = 'api/product/';
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}${this.productsUrl}list`)
  }
  deleteProducts(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}${this.productsUrl}${id}`)
  }
}
