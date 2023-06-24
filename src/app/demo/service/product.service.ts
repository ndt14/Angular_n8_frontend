import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class ProductService {

    constructor(private http: HttpClient) { }
    API = 'http://localhost:8088/api/products'
    getProductsSmall() {
        return this.http.get<any>(`${this.API}`)
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts() {
        return this.http.get<any>(`${this.API}`)
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
    // updateProduct(product: Product): Observable<Product> {
    //     return this.http.put<Product>(`${this.API}/${product.id}`, product);
    //   }
    deleteProduct(id: string | undefined): Observable<Product> {
        return this.http.delete<Product>(`${this.API}/${id}`);
    }
    

}
