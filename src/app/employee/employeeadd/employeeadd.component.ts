import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-employeeadd',
  templateUrl: './employeeadd.component.html',
  styleUrls: ['./employeeadd.component.css']
})
export class EmployeeaddComponent implements OnInit {

  empForm:FormGroup;
  formSubmit=false;
  editData: any;
  isEdit: boolean;
  Array: any =[];
  isAdd: boolean =true;
  error: any;
  constructor(private fb:FormBuilder,
    public dialogRef: MatDialogRef<EmployeeaddComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,private service:EmployeeService) {
      this.editData=data.editValue;
      this.isEdit=data.edit;
      this.Array=data.array.filteredData;
      console.log("this.Array",this.Array)
      console.log("this.editData",this.editData)
      console.log("this.isEdit",this.isEdit)
     }

  ngOnInit(): void {
    this.empForm=this.fb.group({
      name:new FormControl('',Validators.required),
      username:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      street:new FormControl('',[Validators.required]),
      suite:new FormControl('',Validators.required),
      city:new FormControl('',[Validators.required]),
      zipcode:new FormControl('',[Validators.required]),
      lat:new FormControl('',Validators.required),
      lng:new FormControl('',[Validators.required]),
      phone:new FormControl('',Validators.required),
      website:new FormControl('',[Validators.required]),
      cname:new FormControl('',[Validators.required]),
      catchPhrase:new FormControl('',Validators.required),
      bs:new FormControl('',[Validators.required]),
    });
  
    this.service.subject.subscribe((res: any) => {
      if (res.status) {
        this.editData=res.data.editValue;
      this.isEdit=res.data.edit;
      this.Array=res.data.array.filteredData;
      }
    }, (error: HttpErrorResponse) => {
      this.error = error.error.errorMsg;
    
    });
    if(this.isEdit){
    this.isAdd=false;
    this.empForm=this.fb.group({
      name:this.editData.name,
      username:this.editData.username,
      email:this.editData.email,
      street:this.editData.address.street,
      suite:this.editData.address.suite,
      city:this.editData.address.city,
      zipcode:this.editData.address.zipcode,
      lat:this.editData.address.geo.lat,
      lng:this.editData.address.geo.lng,
      phone:this.editData.phone,
      website:this.editData.website,
      cname:this.editData.company.name,
      catchPhrase:this.editData.company.catchPhrase,
      bs:this.editData.company.bs,
    });
    }
  }

  closeModel(){
    this.dialogRef.close({ event: 'close', data: this.Array});
  }

  addEmp(){
    
    if(this.empForm.valid){
      if(this.isEdit){
        const obj={
          id: this.editData.id,
        name: this.empForm.value.name,
        username: this.empForm.value.username,
        email: this.empForm.value.email,
        address: {
          street: this.empForm.value.street,
          suite:this.empForm.value.suite,
          city: this.empForm.value.city,
          zipcode: this.empForm.value.zipcode,
          geo: {
            lat: this.empForm.value.lat,
            lng: this.empForm.value.lng
          }
        },
        phone: this.empForm.value.phone,
        website: this.empForm.value.website,
        company: {
          name: this.empForm.value.cname,
          catchPhrase: this.empForm.value.catchPhrase,
          bs: this.empForm.value.bs
        }
        }
  
        console.log("obj",obj)
  
        this.Array.forEach((element,index) => {
          if(element.id == this.editData.id){
            console.log("push",this.Array[element]);
           
            this.Array[index]= obj;
            console.log("this.Array",this.Array);
          }
          
        });
  
        console.log("this.Array",this.Array);
      }else if(this.isAdd){
        const obj1={
          id: this.Array.length + 1,
        name: this.empForm.value.name,
        username: this.empForm.value.username,
        email: this.empForm.value.email,
        address: {
          street: this.empForm.value.street,
          suite:this.empForm.value.suite,
          city: this.empForm.value.city,
          zipcode: this.empForm.value.zipcode,
          geo: {
            lat: this.empForm.value.lat,
            lng: this.empForm.value.lng
          }
        },
        phone: this.empForm.value.phone,
        website: this.empForm.value.website,
        company: {
          name: this.empForm.value.cname,
          catchPhrase: this.empForm.value.catchPhrase,
          bs: this.empForm.value.bs
        }
        }
        this.Array.push(obj1);
      }
     
      console.log("this.Array",this.Array);
      setTimeout(() => {
        this.closeModel()
      }, 1000);
    }

    
  }
}
