import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/app/common/product';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8088/api/products/'; // Đường dẫn tới API của Node.js

  constructor(private http: HttpClient) { }

  getData(): Observable<Product[]> {
    return this.http.get<any>(this.apiUrl); // Gửi yêu cầu GET đến API
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Đã xảy ra lỗi';
    if (error.error instanceof ErrorEvent) {
      // Xử lý lỗi client-side
      errorMessage = error.error.message;
    } else {
      // Xử lý lỗi server-side
      errorMessage = `Mã lỗi: ${error.status}\nThông báo: ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  getProducts(): Observable<Product[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<any>(url);
  }
  getProduct(id: string): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      catchError(this.handleError)
    );
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, product);
  }

  deleteProduct(id: string | undefined): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
  // searchProducts(searchQuery: string): Observable<any[]> {
  //   return this.http.get<any[]>('http://localhost:8088/api/products', { params: { search: searchQuery } })
  //     .pipe(
  //       map((response: any) => response.products),
  //       catchError((error: HttpErrorResponse) => {
  //         console.error('An error occurred:', error.message);
  //         return throwError('Something went wrong. Please try again later.');
  //       })
  //     );
  // }
  searchProducts(searchQuery: string): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8088/api/products')
      .pipe(
        map(products => {
          if (!searchQuery) {
            return products; // Return all products if no search query provided
          }
          searchQuery = searchQuery.toLowerCase(); // Convert search query to lowercase for case-insensitive comparison
          if (!Array.isArray(products)) {
            return []; // Return empty array if products is not an array
          }
          return products.filter(product =>
            product.name.toLowerCase().includes(searchQuery)
          );
        })
      );
  }

}
