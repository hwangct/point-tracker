import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

import { RestService } from '../rest.service';
import { Item } from '../shared/Item';
import { User } from '../shared/User';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css'],
})
export class AdminItemsComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  @Input() type!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['description', 'points', 'actions'];
  pointControl = new FormControl(Validators.min(10));
  users: User[] = [];

  constructor(
    private rs: RestService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getItems();
    this.getUsers();
  }

  getItems() {
    this.rs.getItems(this.type).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (res) => {
        console.error(`Unable to get items!`);
      },
    });
  }

  getUsers() {
    this.rs.getUsers().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (res) => {
        console.error(`Unable to get users!`);
      },
    });
  }

  addItem() {
    this.dialog
      .open(ItemDialogComponent, {
        data: {
          type: this.type,
          users: this.users,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'saved') {
          this.getItems();
        }
      });
  }

  editItem(item: Item) {
    this.dialog
      .open(ItemDialogComponent, {
        data: {
          type: this.type,
          users: this.users,
          editData: item,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'saved') {
          this.getItems();
        }
      });
  }

  deleteItem(item: Item) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rs.deleteItem(item.id, this.type).subscribe({
          next: (res) => {
            this._snackBar.open(`Deleted item!`, 'Dismiss', {
              duration: 3000,
            });
            this.getItems();
          },
          error: (res) => {
            this._snackBar.open(`Server Error occurred!`, 'Dismiss', {
              duration: 3000,
            });
            console.error(`Server Error: ${res.error}`);
          },
        });
      }
    });
  }
}
