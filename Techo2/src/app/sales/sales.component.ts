import { Component, OnInit } from '@angular/core';
import { SupermanService } from '../service/superman.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  total = [];

  constructor(private superman:SupermanService) { }

  ngOnInit() {
    var postData = {
      cmd:"getMyNewBill"
    }
    this.superman.postSerice(postData)
    .subscribe((result)=>{
      if( result.status === 'Success' ){
        // this.dataSource = result.data
        this.total = result.data
      } else {
        console.log("erroe");
      }
    })
  }

  getTotal(){
    return this.total.map( t=> t.total).reduce((acc, value)=> acc+value, 0)
  }

}
