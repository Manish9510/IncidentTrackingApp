import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { error } from 'console';

@Component({
  selector: 'app-create-incident',
  imports: [FormsModule],
  templateUrl: './create-incident.component.html',
  styleUrl: './create-incident.component.css'
})
export class CreateIncidentComponent {

  incidentObj: any = {
    "incidentId": 0,
    "title": "",
    "description": "",
    "priority": "",
    "status": "Open",
    "createdBy": 0,
    "assignedTo": null  ,
    "createdDate": new Date()
  }

  loggeUserData: any;
  constructor(){
    const data = localStorage.getItem('incidentUser');
    if(data!=null){
      this.loggeUserData = JSON.parse(data);
    }
  } 
  masterServ = inject(MasterService);

  onSave(){
    this.incidentObj.createdBy=this.loggeUserData.userId;
    this.masterServ.createNewIncident(this.incidentObj).subscribe((res:any)=>{
        alert("Incident Created Successfully!!");      
    },error=>{
      debugger;
    })
  }
}
