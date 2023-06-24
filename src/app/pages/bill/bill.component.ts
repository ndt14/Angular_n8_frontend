import { BillService } from './../../service/bill.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  billForm!: FormGroup;
  bill: any;

  constructor(
    private formBuilder: FormBuilder,
    private billService: BillService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // ...

    // Get the productId from the URL
    // this.route.paramMap.subscribe((params) => {
    //   const productId = params.get('productId');
    //   if (productId) {
    //     // Load the bill using the productId
    //     this.loadBillById(productId);
    //   }
    // });
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
  submitForm() {
    // Logic to handle form submission
    console.log('Form submitted!');
    console.log('Bill ID:', this.bill._id);
    console.log('Bill Name:', this.bill.name);
    // Add more logic to handle other form fields
  }
}
