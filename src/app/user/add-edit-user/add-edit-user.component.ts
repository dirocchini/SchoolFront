import { Component, Input, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import { ShowUserComponent } from '../show-user/show-user.component';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  constructor(private service: ApiserviceService) { }
  @Input() user: any;
  Id = "";
  Name = "";
  SurName = "";
  Email = "";
  BirthDate = "";
  Schooling: any = {};
  SchoolingList: any = [];


  ngOnInit(): void {
    this.loadEmployeeList();
  }

  loadEmployeeList() {

    this.service.getAllSchoolings().subscribe((data: any) => {
      this.SchoolingList = data;

      this.Id = this.user.id;
      this.Name = this.user.name;
      this.SurName = this.user.surname;
      this.Email = this.user.email;
      this.BirthDate = this.user.birthDate;
      this.Schooling = this.user.schooling

    });
  }

  addEmployee() {
    var val = {
      Name: this.Name,
      SurName: this.SurName,
      Email: this.Email,
      BirthDate: this.BirthDate,
      SchoolingType: this.Schooling.type
    };

    console.log(val)

    this.service.addUser(val).subscribe(res => {
      console.log(res);
    });
  }

  updateEmployee() {
    var val = {
      Id: this.Id,
      Name: this.Name,
      SurName: this.SurName,
      Email: this.Email,
      BirthDate: this.BirthDate,
      SchoolingTypeId: this.Schooling.id
    };

    this.service.updateUser(val).subscribe(res => {
      console.log(res)
      
    });
  }
}