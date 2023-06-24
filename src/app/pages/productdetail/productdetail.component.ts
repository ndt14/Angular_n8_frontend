import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { DataService } from 'src/app/datas/data.service';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  quantity = 1;
  product!: Product;

  constructor(
    private route: ActivatedRoute, private router: Router,
    private dataService: DataService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id')!;
      this.dataService.getProduct(productId).subscribe(
        product => {
          this.product = product;
        },
        error => {
          console.log('Error retrieving product:', error);
        }
      );
    });
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }
  isHidden: boolean = true;
  buttonText: string = 'Read More';

  toggleText() {
    this.isHidden = !this.isHidden;
    this.buttonText = this.isHidden ? 'Read More' : 'Read Less';
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
    window.alert("You have added " + product.name + " to your cart!");
    this.router.navigate(['/cart'])
  }
}
