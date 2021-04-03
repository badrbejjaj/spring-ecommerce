import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@app/_models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Product[]>  {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  update(id, params): Observable<Product> {
    return this.http.put<Product>(`${environment.apiUrl}/products/${id}`, params);
  }

  create(product: Product): Observable<Product>  {
    return this.http.post<Product>(`${environment.apiUrl}/products/create`, product);
  }

  delete(id: string): any {
      return this.http.delete(`${environment.apiUrl}/products/${id}`);
  }
}
