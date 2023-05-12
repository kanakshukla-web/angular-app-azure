import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;

  showSpinner: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(): void {
    console.log("Login Details are");
    console.log(this.username, this.password);

    let payload = {
      username: this.username.toLowerCase(),
      password: this.password.toLowerCase()
    }

    this.authService.userLogin(payload).subscribe({
      next: response => {
        console.log(response);
        if (response && response.token) {
          alert("Login successfully")
        }
      },
      error: error => { console.log(error) }
    })
  }

}
