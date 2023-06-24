import { Component } from '@angular/core';
import { UserService } from 'src/app/datas/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    this.userService.register(this.user).subscribe(
      response => {
        // Xử lý thành công, ví dụ: hiển thị thông báo, chuyển hướng trang, vv.
        console.log('Đăng ký thành công:', response);
        confirm("Đăng ký thành công")
        this.router.navigate(['/login'])
      },
      error => {
        // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi, vv.
        console.error('Đăng ký thất bại:', error);
        confirm("Đăng ký thất bại")

      }
    );
  }
}
