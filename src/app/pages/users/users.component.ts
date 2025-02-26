import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-users',
  imports: [ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  userForm: FormGroup = new FormGroup({});
  masterServ = inject(MasterService);
  userList = signal<any[]>([]);

  constructor(){
    this.initializeForm();
  }

  ngOnInit(): void {
      this.loadUsers();
  }
  initializeForm(userData ? : any){
    this.userForm = new FormGroup({
        userId : new FormControl(userData ? userData.userId : 0),
        userName: new FormControl(userData ? userData.userName : ''),
        emailId: new FormControl(userData ? userData.emailId : ''),
        fullName: new FormControl(userData ? userData.fullName : ''),
        password: new FormControl(userData ? userData.password : ''),
        role: new FormControl(userData ? userData.role : ''),
    })
  }

  loadUsers(){
    this.masterServ.getAllUsers().subscribe((res:any)=>{
      if(res.result){
        this.userList.set(res.data);
      }
    })
  }

  onSaveUser(){
    debugger;
    const formValue = this.userForm.value;
    this.masterServ.createNewUser(formValue).subscribe((res:any)=>{
      if(res.result){
        alert("User Created Successfully!!");
        this.loadUsers();
      }else{
        alert(res.message);
      }
    })
  }

  onEdit(userData:any){
    this.initializeForm(userData);
  }

  onUpdateUser(){
    const formValue = this.userForm.value;

    formValue.createdDate = new Date();
    formValue.projectName ="IncidentTracking";
    formValue.refreshToken = new Date();
    formValue.refreshTokenExpiryTime = new Date();


    this.masterServ.updateUser(formValue).subscribe((res:any)=>{
      if(res.result){
        alert("User Updated Successfully!!");
        this.loadUsers();
      }else{
        alert(res.message);
      }
    })
  }
}
