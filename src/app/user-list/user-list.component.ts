import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { User } from '../shared/User';
import { Item } from '../shared/Item';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  earnItems: Item[] = [];
  loseItems: Item[] = [];
  rewardItems: Item[] = [];
  edit: boolean = false;
  userForm: FormGroup;

  constructor(
    private rs: RestService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.userForm = new FormGroup({
      formArrayName: this.formBuilder.array([]),
    });
  }
  getEdit(data: boolean) {
    this.edit = data;
  }

  ngOnInit(): void {
    this.rs.getUsers().subscribe((data) => {
      if (!data) {
        console.error(`unable to get users`);
      } else {
        this.users = data;
      }
    });

    this.rs.getItems('earn').subscribe((data) => {
      if (!data) {
        console.error(`unable to get ways to earn points`);
      } else {
        this.earnItems = data;
      }
    });

    this.rs.getItems('lose').subscribe((data) => {
      if (!data) {
        console.error(`unable to get ways to lose points`);
      } else {
        this.loseItems = data;
      }
    });

    this.rs.getItems('rewards').subscribe((data) => {
      if (!data) {
        console.error(`unable to get rewards`);
      } else {
        this.rewardItems = data;
      }
    });
  }

  openUserDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  /** TODO: Delete Temporary test functions */
  addUser() {
    let createData = {
      id: 'temp',
      name: 'TEMP',
      subtitle: 'DELETE THIS GUY',
      imageurl: 'http://tempuser',
      points: 0,
    };

    this.rs.addUser(createData).subscribe((data) => {
      if (!data) {
        console.error(`unable to add user`);
      } else {
        this.users.push(createData);
      }
    });
  }

  deleteUser(id: string) {
    this.rs.deleteUser(id).subscribe((data) => {
      if (!data) {
        console.error(`unable to delete user ${id}`);
      } else {
        const index = this.users.map((object) => object.id).indexOf(id);
        this.users.splice(index, 1);
      }
    });
  }
}
