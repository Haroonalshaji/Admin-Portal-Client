import { Component, OnInit } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import { arrayMax } from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  adminName: string = "";
  adminDetails: any = {};
  adminpswd: string = "";
  ngOnInit(): void {
    this.adminName = localStorage.getItem('adminName') || "empty";
    this.adminpswd = localStorage.getItem('adminPassword') || "empty";
    this.api.Authenticate().subscribe((admin: any) => {
      this.adminDetails = admin;
    })
  }

  adminLoggedStatus: any = new Date()//to hold current date and time

  siderbarStatus: boolean = true;

  constructor(private api: AdminApiService) { }

  menubarClicked() {
    this.siderbarStatus = !this.siderbarStatus
  }

  updateAdmin() {

    this.api.updateAdmin(this.adminDetails).subscribe((admin:any)=>{
      alert("Admin Details Updated !")
      localStorage.setItem("adminName",admin.name)
      localStorage.setItem("adminName",admin.name)
    })
  }

}
