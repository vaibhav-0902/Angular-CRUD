import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserService } from './services/user.service';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';

@NgModule({
  declarations: [AppComponent, UserListComponent, AddEditUserComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatDialogModule,
    MatCardModule,
    MatSortModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatSnackBarModule,
    MatIconModule,
    AppRoutingModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
