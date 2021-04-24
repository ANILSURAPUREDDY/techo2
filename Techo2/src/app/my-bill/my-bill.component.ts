import { Component, OnInit } from '@angular/core';
import { SupermanService } from '../service/superman.service';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import  _  from 'underscore';

@Component({
  selector: 'app-my-bill',
  templateUrl: './my-bill.component.html',
  styleUrls: ['./my-bill.component.scss']
})
export class MyBillComponent implements OnInit {

  list;
  myBillForm:FormGroup;
  submitted=false;
  total_bill =[];

  constructor(private superman: SupermanService, private _snackBar:MatSnackBar,
              private formBuilder:FormBuilder) { }

  ngOnInit() {
    const data = {
      cmd:"getItems"
    }
    this.superman.postSerice(data)
    .subscribe((result)=>{
      if( result.status === 'Success'){
        this.list = result.msg;
        console.log("list",this.list)
      } else {
        this._snackBar.open('Some Error from Server','Error',{
          duration:2000,
          panelClass: ['blue-snackbar']
        })
      } 
    })
    this.myBillForm = this.formBuilder.group({
      selected_item:['', Validators.required],
      quantity:['',Validators.required]
    })
    
    this.getMyNewBill();
  }

  displayedColumns: string[] = ['item_name', 'price', 'quantity', 'total'];
  dataSource;

  onSubmit(){
    this.submitted = true;
    if(this.myBillForm.invalid){
      return
    } else {
      console.log(this.myBillForm.value)
      var findWhereValue = _.findWhere(this.list,{_id:this.myBillForm.value.selected_item})
      console.log("fibnal",findWhereValue)
      var billData = {
        cmd:"generateBill",
        params:{
          id: findWhereValue._id,
          item_name: findWhereValue.item_name,
          price: findWhereValue.price,
          quantity: this.myBillForm.value.quantity,
          total: (findWhereValue.price*this.myBillForm.value.quantity)
        }
      }
      this.superman.postSerice(billData)
      .subscribe(( result ) =>{
        if( result.status === 'Success' ){
          console.log("updated",result);
          this._snackBar.open('You are Password changed successfully','Success',{
            duration:2000,
            panelClass: ['blue-snackbar']
          })
          // this.dataSource =
          this.getMyNewBill();
          this.myBillForm.reset();
        } else {
          this._snackBar.open('Some Error from Server','Error',{
            duration:2000,
            panelClass: ['blue-snackbar']
          })
        }
      })
    }
  }

  getMyNewBill(){
    var postData = {
      cmd : "getMyNewBill"
    }
    this.superman.postSerice(postData)
    .subscribe((result)=>{
      if( result.status === 'Success' ){
        this.dataSource = result.data
        this.total_bill= result.data;

      } else {
        console.log("error");
      }
    })
  }

  getTotalCost(){
    return this.total_bill.map(t=>t.total).reduce((acc, value)=> acc+value, 0)
  }

}
