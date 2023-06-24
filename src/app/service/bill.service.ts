import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = 'http://localhost:8088/api/cart';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
  loadBillById() {
    // Extract the cart ID from the URL
    const url = window.location.href;
    const cartId = url.substring(url.lastIndexOf('/') + 1);
  
    // Make an HTTP request to fetch the bill data from an API
    this.http.get(`http://localhost:8088/api/cart/${cartId}`).subscribe(
      (bill) => {
        console.log('Bill:', bill);
        // Process the retrieved bill data as needed
      },
      (error) => {
        console.error('Error loading bill:', error);
        // Handle any errors that occur during the API request
      }
    );
  }
}
