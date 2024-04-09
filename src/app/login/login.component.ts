import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from '../services/admin-api.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  adminDetails: any = {}; //to hold admin details
  constructor(private toastr: ToastrService, private api: AdminApiService, private router: Router) { }

  login() {
    if (this.email && this.password) {
      this.api.Authenticate().subscribe({
        next: (res: any) => {
          const { email, password } = res
          if (email == this.email && password == this.password) {
            // alert("Login already.")
            this.toastr.success("login successfully")
            this.adminDetails = res;  //to assign details to it
            console.log(this.adminDetails);   //to get tis data to dashboard we have to assign this to local-storage so as we can get this from there
            //local-storage
            localStorage.setItem("adminName", this.adminDetails.name)
            localStorage.setItem("adminPassword", this.adminDetails.password)

            setTimeout(() => {
              this.router.navigate(['/dashboard'])
            }, 2000)
          }
        }
      })
    } else {
      // alert("Please enter valid email or password")
      this.toastr.error("Please enter valid details")
    }
  }
}
