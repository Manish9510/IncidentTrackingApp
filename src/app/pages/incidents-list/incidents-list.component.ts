  import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-incidents-list',
  imports: [],
  templateUrl: './incidents-list.component.html',
  styleUrl: './incidents-list.component.css'
})
export class IncidentsListComponent implements OnInit{

  masterServ = inject(MasterService);

  loggeUserData: any;
  incidentList: any[] = [];

  constructor(){
    const data = localStorage.getItem('incidentUser');
    if(data!=null){
      this.loggeUserData = JSON.parse(data);
    }
  }

  ngOnInit(): void{
    if(this.loggeUserData.role == "User"){
      this.getIncidentCreatedByUser();
    }else if(this.loggeUserData.role == "IncidentAdmin"){
      this.getAllIncidents();
    }else if(this.loggeUserData.role == "Support Staff"){
      this.getaIncidentAssigntoUser();

    }
  }
  
  getIncidentCreatedByUser(){
    this.masterServ.getIncidentCreatedByUser(this.loggeUserData.userId).subscribe((res : any)=>{
      this.incidentList=res;
    })
  }

  getAllIncidents(){
    this.masterServ.getAllIncidents().subscribe((res : any)=>{
      this.incidentList=res;
    })
  }

  getaIncidentAssigntoUser(){
    this.masterServ.getaIncidentAssigntoUser(this.loggeUserData.userId).subscribe((res : any)=>{
      this.incidentList=res;
    })
  
  }
}
