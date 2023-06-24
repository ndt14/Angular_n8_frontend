import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/datas/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: any[] = []; // Initialize products as an empty array

  constructor(private dataService: DataService, private router: Router) { }

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
