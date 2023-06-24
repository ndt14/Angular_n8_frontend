import { Component } from '@angular/core';
import { UserService } from 'src/app/datas/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onSubmit() {
    console.log('Thông tin đăng nhập:', this.credentials);

    this.userService.login(this.credentials).subscribe(
      (response) => {
        // Xử lý đăng nhập thành công, ví dụ: chuyển hướng trang, lưu thông tin đăng nhập vào LocalStorage, vv.
        console.log('Đăng nhập thành công:', response);
        alert('Đăng nhập thành công');
        this.userService.setLoggedIn(true);
        console.log("quyền:", response.user.role);

        // Kiểm tra quyền đăng nhập
        if (response.user.role === 'admin') {
          // Chuyển hướng sang trang admin
          this.router.navigate(['/admin']);
        } else {
          // Chuyển hướng sang trang người dùng
          this.router.navigate(['/home']);
        }
        // Thực hiện chuyển hướng trang đến trang sau khi đăng nhập thành công
      },
      (error) => {
        // Xử lý lỗi đăng nhập, ví dụ: hiển thị thông báo lỗi, xóa thông tin đăng nhập, vv.
        console.error('Đăng nhập thất bại:', error);
        confirm('Đăng nhập thất bại');
        // Xóa thông tin đăng nhập hoặc thực hiện các xử lý khác khi đăng nhập thất bại
      }
    );
  }
}
