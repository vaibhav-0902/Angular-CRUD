import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { ChangeDetectorRef } from '@angular/core';

import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  selection = new SelectionModel<User>(true, []);
  users: User[] = [];
  dataSource!: MatTableDataSource<User>;

  displayedColumns: string[] = [
    'select',
    'firstName',
    'lastName',
    'email',
    'contactNumber',
    'actions',
  ];

  constructor(
    private la: LiveAnnouncer,
    private userService: UserService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(users); // Initialize the data source
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.cd.detectChanges();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.la.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.la.announce('Sorting cleared');
    }
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.createUser(result);
        this.dataSource.data = this.users;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '500px',
      data: { ...user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updateUser(result);
        this.dataSource.data = this.users;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

  deleteSelectedUser(): void {
    const selectedId = this.selection.selected.map((user) => user.id);
    for (const userId of selectedId) {
      this.userService.deleteUser(userId);
    }

    this.dataSource.data = this.users;

    this.dataSource.paginator = this.paginator;

    this.selection.clear();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  customFilterPredicate(): (data: User, filter: string) => boolean {
    return (user: User, filter: string) => {
      return (
        user.firstName.toLowerCase().includes(filter) ||
        user.lastName.toLowerCase().includes(filter) ||
        user.contactNumber.includes(filter)
      );
    };
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
}
