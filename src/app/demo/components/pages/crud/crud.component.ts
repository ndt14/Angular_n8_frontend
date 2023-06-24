import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { DataService } from 'src/app/datas/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './crud.component.html',
  providers: [MessageService]
})
export class CrudComponent implements OnInit {

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private http: HttpClient, private productService: ProductService, private dataService: DataService, private messageService: MessageService) { }

  ngOnInit() {
    this.productService.getProducts().then(data => this.products = data);
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }


  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product): void {
    if (confirm("Bạn chắc chưa???")) {
      const url = `http://localhost:8088/api/products/${product._id}`;

      this.http.delete(url).subscribe(
        () => {
          // Product deleted successfully
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          // Optionally, you can fetch the updated product list from the server
          this.fetchProducts();
        },
        (error) => {
          // Failed to delete product
          console.error('Error deleting product:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete product', life: 3000 });
        }
      );
      console.log(product);
    }
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  fetchProducts(): void {
    this.productService.getProducts().then(data => this.products = data);
  }
  addProduct(product: Product): void {
    this.http.post('http://localhost:8088/api/products', product)
      .subscribe(
        () => {
          // Product added successfully
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Added', life: 3000 });
          // Optionally, you can fetch the updated product list from the server
          this.fetchProducts();
        },
        (error) => {
          // Failed to add product
          console.error('Error adding product:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add product', life: 3000 });
        }
      );
    console.log(this.product);

  }



  updateProduct(product: Product): void {
    const { _id, ...productWithoutId } = product;
    this.http.put(`http://localhost:8088/api/products/${product._id}`, productWithoutId)
      .subscribe(
        () => {
          // Product updated successfully
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          // Optionally, you can fetch the updated product list from the server
          this.fetchProducts();
        },
        (error) => {
          // Failed to update product
          console.error('Error updating product:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update product', life: 3000 });
        }
      );
    console.log(product);
  }


  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
