import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent implements OnInit {
  searchResults: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const searchQuery = params['search'];

      // Perform the search based on the searchQuery
      this.searchProducts(searchQuery);
    });
  }

  searchProducts(searchQuery: string): void {
    if (!searchQuery) {
      this.searchResults = []; // Clear the search results if the search query is empty
      return;
    }
  
    this.http
      .get<any>('http://localhost:8088/api/products')
      .subscribe((response) => {
        const products = response.data; // Assuming the array of products is nested under the 'data' property
  
        // Filter the products based on the search query
        this.searchResults = products.filter((product: { name: string }) => {
          return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
      });
  }
  
}
