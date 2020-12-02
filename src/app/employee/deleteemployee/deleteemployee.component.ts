import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/employee.service';
@Component({
  selector: 'app-deleteemployee',
  templateUrl: './deleteemployee.component.html',
  styleUrls: ['./deleteemployee.component.css']
})
export class DeleteemployeeComponent implements OnInit {
  editData: any;
  isEdit: any;
  Array: any;
  error: any;

  constructor(public dialogRef: MatDialogRef<DeleteemployeeComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,private service:EmployeeService) { 
      this.editData=data.editValue;
      this.isEdit=data.edit;
      this.Array=data.array.filteredData;
      console.log("this.Array",this.Array)
      console.log("this.editData",this.editData)
      console.log("this.isEdit",this.isEdit)
    }

  ngOnInit(): void {
    this.service.subject.subscribe((res: any) => {
      if (res.status) {
        this.editData=res.data.editValue;
      this.isEdit=res.data.edit;
      this.Array=res.data.array.filteredData;
      }
    }, (error: HttpErrorResponse) => {
      this.error = error.error.errorMsg;
    
    });
  }

  closeModel(){
    this.dialogRef.close({ event: 'close', data: this.Array});
  }

  deleteData(){
    this.Array.forEach((element,index) => {
      if(element.id == this.editData.id){
        this.Array.splice(index,1);
      }
      
      
    });
    for(let i = 0;i< this.Array.length;i++){
      this.Array[i].id=i+1;
    }

    setTimeout(() => {
      this.closeModel()
    }, 1000);
  }

}
