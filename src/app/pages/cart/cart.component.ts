import { CartService } from 'src/app/service/cart.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  orderItems!: any[];

  constructor(private http: HttpClient,private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getData().subscribe(
      (response: any) => {
        this.cartItems = response.data; // Assign the 'data' property of the response to 'products'
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  removeFromCart(product: any) {
    // Remove item from the local cartItems array
    const index = this.cartItems.indexOf(product);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }

    // Make HTTP DELETE request to remove item from the cart API
    const url = `http://localhost:8088/api/cart/${product._id}`; // Assuming the product has an "id" property
    this.http.delete(url).subscribe(
      () => {
        console.log('Product removed from cart API successfully!');
      },
      (error) => {
        console.error('Failed to remove product from cart API:', error);
        // Add the item back to the local cartItems array on API failure
        this.cartItems.push(product);
      }
    );
  }

  clearCart() {
    this.cartItems = [];
    this.cartService.clearCart();
  }
  goToBillingPage() {

  }
}
