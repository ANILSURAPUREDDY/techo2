import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';
import { SupermanService } from 'src/app/service/superman.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  itemForm : FormGroup;
  submitted = false;

  constructor(private matDialog: MatDialog, private formBuilder:FormBuilder,
              private superman: SupermanService, private router: Router,
              private _snakeBar:MatSnackBar) { }

  ngOnInit() {
   this.getItems()
  }

  displayedColumns: string[] = ['item_name', 'price', 'action'];
  dataSource;

  openDialog(){
    this.matDialog.open(AddItemComponent, {
      width: '350px'
    })
  }

  editDialog(action,obj){
    if( action === 'Update'){
      this.matDialog.open(AddItemComponent, {
        width: '350px',
        data:obj
      })
    }
  }

  getItems(){
    const data = {
      cmd:"getItems"
    }
    this.superman.postSerice(data)
    .subscribe((result)=>{
      if( result.status === 'Success'){
        this.dataSource = result.msg;
        this.router.navigate(['']);
        console.log("msg",this.dataSource)
      } else {
        this._snakeBar.open('Some Error from Server','Error',{
          duration:2000,
          panelClass: ['blue-snackbar']
        })
      }
    })
  }

}
