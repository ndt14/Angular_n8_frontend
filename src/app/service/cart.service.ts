import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../common/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8088/api/cart/';
  
  private cartItems: any[] = [];

  constructor(private http: HttpClient) {}

  // Method to add a product to the cart
  addToCart(product: any) {
    const existingProduct = this.cartItems.find(item => item._id === product._id);
  
    if (existingProduct) {
      existingProduct.quantity++;
      
      // Send a PUT request to update the existing product's quantity in the cart API
      this.http.put(this.apiUrl + existingProduct._id, existingProduct).subscribe(
        () => {
          console.log('Product quantity updated in cart API successfully!');
        },
        (error) => {
          console.error('Failed to update product quantity in cart API:', error);
          existingProduct.quantity--;
        }
      );
    } else {
      // Add the product to the cartItems array with a quantity of 1
      this.cartItems.push({ ...product, quantity: 1 });
      
      // Send a POST request to add the product to the cart API
      this.http.post(this.apiUrl, product).subscribe(
        () => {
          console.log('Product added to cart API successfully!');
        },
        (error) => {
          console.error('Failed to add product to cart API:', error);
          this.cartItems.pop();
        }
      );
    }
  }
  
  // Method to get cart data from the cart API
  getData(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl);
  }

  // Method to clear the cart by emptying the cartItems array
  clearCart() {
    this.cartItems = [];
  }
}
