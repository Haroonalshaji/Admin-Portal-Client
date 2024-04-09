import { BlockParameter } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserApiService } from '../services/user-api.service';
import { userModel } from '../users.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  user: userModel = {}
  constructor(private route: ActivatedRoute, private api: UserApiService, private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      console.log(res);
      const { id } = res
      console.log(id);
      //fetch particular user details using id
      //parameter
      //Api request
      this.api.viewAUser(id).subscribe((res: any) => {
        console.log(res);
        this.user = res

      })

    })

  }
  EditUser(id: any) {
    this.api.edituser(id, this.user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success("updated success")

      }
    })
  }
}
