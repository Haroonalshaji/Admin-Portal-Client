import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserApiService } from '../services/user-api.service';
import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  p: number = 1;

  allUsers: any[] = [];  //to hold all the users
  searchText: string = ""

  constructor(private api: UserApiService, private tostr: ToastrService) { }
  ngOnInit(): void {
    this.viewUserList()
  }

  viewUserList() {
    this.api.viewUserAPI().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allUsers = res;
      }, error: (err: any) => {
        console.log(err.message);
      }
    })
  }

  deleteUser(id: any) {
    this.api.deleteUserAPI(id).subscribe({
      next: (res: any) => {
        console.log("user deleted");
        this.tostr.success("User Deleted Succesfully...")
        this.viewUserList()

      }, error: (err: any) => {
        console.log(err.message);
        this.tostr.error("Error removing the User")
      }
    })
  }

  sortById() {
    this.allUsers.sort((a: any, b: any) => a.id - b.id)
  }

  sortByName() {
    this.allUsers.sort((a: any, b: any) => a.name.localeCompare(b.name))
  }

  generatePDF() {
    let pdf = new jspdf()
    let head = [['id', 'name', 'email', 'status']]
    let body: any = []
    this.allUsers.forEach((item: any) => {
      if (item.id != '1') {
        body.push([item.id, item.name, item.email, item.status])
      }
    })
    pdf.text("All Users", 10, 10);
    autoTable(pdf, { head, body })
    pdf.output("dataurlnewwindow")
    pdf.save("alluserlist.pdf")
  }

}
