import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
//components
import { ItemsComponent } from './items/items.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { MyBillComponent } from './my-bill/my-bill.component';
import { SalesComponent } from './sales/sales.component';
import { AddItemComponent } from './add-item/add-item.component';
//material forms 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatGridListModule,
  MatFormFieldModule, 
  MatRadioModule,
  MatSelectModule,
  MatCheckboxModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
} from '@angular/material';

//service
import { HttpClient,HttpClientModule }    from '@angular/common/http';
import { SupermanService } from './service/superman.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    NewBillComponent,
    MyBillComponent,
    SalesComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule, 
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [SupermanService],
  bootstrap: [AppComponent],
  entryComponents: [AddItemComponent]
})
export class AppModule { }
