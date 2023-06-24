import { CartService } from './../../service/cart.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../common/product';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { DataService } from 'src/app/datas/data.service';

declare var $: any; // Declare the jQuery variable
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 12; // Số sản phẩm trên mỗi trang
  products: any[] = []; // Danh sách tất cả sản phẩm
  // Khai báo biến giá trị tối thiểu và tối đa để lọc
  minPrice: number = 0;
  maxPrice: number = 0;
  // Biến để lưu trữ danh sách sản phẩm lọc theo giá
  filteredProducts: any[] = [];

  constructor(private router: Router, private dataService: DataService, private cartService: CartService) { }
  // ngOnInit() {
  //   this.getProducts();
  // }

  getProducts() {
    this.dataService.getData().subscribe(
      (response: any) => {
        this.products = response.data; // Assign the 'data' property of the response to 'products'
      },
      (error) => {
        console.log(error);
      }
    );
  }
  viewProductDetail(product: Product) {
    this.router.navigate(['/products', product._id]);
  }
  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  get pagedProducts(): any[] {
    // Sử dụng filteredProducts nếu có, nếu không, sử dụng products ban đầu
    const productList = this.filteredProducts.length > 0 ? this.filteredProducts : this.products;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return productList.slice(startIndex, endIndex);
  }


  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  customOptions: OwlOptions = {
    loop: true,
    margin: 0,
    // nav: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },

  }
  slideIndex = 0;

  ngOnInit() {
    this.getProducts();
    this.showSlides();
  }

  showSlides() {
    let i;
    const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
    setTimeout(() => this.showSlides(), 1500); // Change image every 2 seconds
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    window.alert("You have added " + product.name + " to your cart!");
    this.router.navigate(['/cart'])
  }
  filterProductsByPrice() {
    this.filteredProducts = this.products.filter((product: any) => {
      // Kiểm tra nếu giá sản phẩm nằm trong khoảng giá được lựa chọn
      return product.price >= this.minPrice && product.price <= this.maxPrice;
    });
  }


}
