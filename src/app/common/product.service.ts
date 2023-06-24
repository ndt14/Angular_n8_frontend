import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';

import { Product } from './product';

import { DataService } from '../datas/data.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    products: any[] = []; // Initialize products as an empty array

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.getProducts();
    }

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
}
