import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IAPIRESPONSE, User } from '../../model/user';
import { MasterService } from '../../services/master.service';
import { Router } from '@angular/router';
import { debug } from 'console';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: User = new User();
  masterServ = inject(MasterService);
  router = inject(Router)

  onLogin(){
    debugger
    this.masterServ.login(this.loginObj).subscribe((res: IAPIRESPONSE)=>{
      debugger;
      if(res.result){
        localStorage.setItem('incidentUser', JSON.stringify(res.data));
        this.router.navigateByUrl("/dashboard");
      }
      else{
        alert("Wrong Credentials");
      }
    })

    }
  }

