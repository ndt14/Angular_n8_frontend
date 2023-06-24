import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/datas/user.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { DataService } from 'src/app/datas/data.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public userService: UserService, private router: Router, private dataService: DataService) { }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/home']);
  }

  searchText: string = '';
  products: Product[] = [];

  searchProducts() {
    this.router.navigate(['/search'], { queryParams: { search: this.searchText } });
  }
  
}
