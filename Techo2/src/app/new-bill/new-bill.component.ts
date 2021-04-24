import { Component, OnInit } from '@angular/core';
import { SupermanService } from '../service/superman.service';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit {

  displayedColumns: string[] = ['bill_number', 'date', 'total'];
  dataSource;
  total = [];

  constructor(private superman:SupermanService) { }

  ngOnInit() {
    var postData = {
      cmd:"getMyNewBill"
    }
    this.superman.postSerice(postData)
    .subscribe((result)=>{
      if( result.status === 'Success' ){
        this.dataSource = result.data
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
