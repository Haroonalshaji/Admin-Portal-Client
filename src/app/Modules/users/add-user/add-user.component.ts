import { Component } from '@angular/core';
import { userModel } from '../users.model';
import { UserApiService } from '../services/user-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  user: userModel = {} //to hold user details

  constructor(private api: UserApiService, private tostr: ToastrService, private route: Router) { }

  addUser() {
    console.log(this.user);
    this.api.addUserAPI(this.user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.tostr.success("User Added Succesfully")
        setTimeout(() => {
          this.route.navigateByUrl('/users')
        }, 1000)

      },
      error(error: any) {
        alert(error);
      }
    })
  }

}
