import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SupermanService } from '../service/superman.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  addForm : FormGroup;
  submitted = false;
  editValues ;
  id;

  constructor(private formBuilder:FormBuilder, private superman: SupermanService,
              private _snakeBar:MatSnackBar,private dialogRef:MatDialogRef<AddItemComponent>,
              private router : Router, @Inject(MAT_DIALOG_DATA) public data: any ) { 
                this.editValues = data
                console.log("data edit", data)
              }

  ngOnInit() {
    if( !this.editValues ){
    this.addForm = this.formBuilder.group({
      item_name : ['', Validators.required],
      price: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(1)
      ]))
    })} else{
      this.id = this.editValues._id
      this.addForm = this.formBuilder.group({
        item_name:this.editValues.item_name,
        price:this.editValues.price
      })
    } 
  }

  onSubmit(){
    console.log("data",this.addForm.value)
    this.submitted = true;
    if(this.addForm.invalid){
      return ;
    } else {
      if( !this.id ){
        var postData = {
          cmd:'addItem',
          params :{
            item_name: this.addForm.value.item_name,
            price: this.addForm.value.price
          }
        }
      this.superman.postSerice(postData)
      .subscribe( (result) =>{
        if(result.status === "Success"){
          this.dialogRef.close();
          this._snakeBar.open('You are Password changed successfully','Success',{
            duration:2000,
            panelClass: ['blue-snackbar']
          })
          // this.dialogRef.close(this.addForm.value);
          // this.dialogRef.close();
          this.router.navigate(['/items']);
        } else {
          this._snakeBar.open('Some Error from Server','Error',{
            duration:2000,
            panelClass: ['blue-snackbar']
          })
        }
      })
      } else {
        console.log("updating data");
        var updateData = {
          cmd:"updateItem",
          params:{
            id:this.id,
            item_name:this.addForm.value.item_name,
            price:this.addForm.value.price
          }
        }
        this.superman.postSerice(updateData)
        .subscribe((result)=>{
          if(result.status === "Success"){
            this.dialogRef.close();
            this._snakeBar.open('You are Password changed successfully','Success',{
              duration:2000,
              panelClass: ['blue-snackbar']
            })
            // this.dialogRef.close(this.addForm.value);
            // this.dialogRef.close();
            this.router.navigate(['/items']);
          } else {
            this._snakeBar.open('Some Error from Server','Error',{
              duration:2000,
              panelClass: ['blue-snackbar']
            })
          }
        })
      }
      
    } 
  }

  close() {
    this.dialogRef.close();
  }

}
