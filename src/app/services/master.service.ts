import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAPIRESPONSE, User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  http = inject(HttpClient);

  apiUrl: string = "https://projectapi.gerasim.in/api/IncidentTracking/";

  login(obj:User){
    debugger;
    return this.http.post<IAPIRESPONSE>(this.apiUrl+"login ", obj); //using Concatenation
  }

  getAllUsers(){
    return this.http.get(`${this.apiUrl}GetAllUsers`); //using Template Literals
  }

  createNewUser(obj: any){
    return this.http.post(`${this.apiUrl}Register`, obj); //using Template Literals
  }

  updateUser(obj: any){
    return this.http.post(`${this.apiUrl}UpdateUser`,obj); //using Template Literals
  }

  deleteUserById(id: number){
    return this.http.delete(`${this.apiUrl}DeleteUserByUserId?userId=i${id}`); //using Template Literals
  }
}
