import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//importing the components for routing 
import { ItemsComponent } from './items/items.component';
import { MyBillComponent } from './my-bill/my-bill.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  { path:'', component:ItemsComponent},
  { path:'items', component:ItemsComponent},
  { path:'bill', component:MyBillComponent},
  { path:'new-bill', component:NewBillComponent},
  { path:'sales', component:SalesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
