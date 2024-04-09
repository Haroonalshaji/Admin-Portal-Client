import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from '../users.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  server_url = 'http://localhost:3000'


  constructor(private http: HttpClient) { }

  addUserAPI(user: userModel) {
    return this.http.post(`${this.server_url}/users`, user)
  }

  viewUserAPI() {
    return this.http.get(`${this.server_url}/users`)
  }

  deleteUserAPI(id: any) {
    return this.http.delete(`${this.server_url}/users/${id}`)
  }

  viewAUser(id: any) {
    return this.http.get(`${this.server_url}/users/${id}`)
  }

  edituser(id: any, user: userModel) {
    return this.http.put(`${this.server_url}/users/${id}`, user)
  }


}
