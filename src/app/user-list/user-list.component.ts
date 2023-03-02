import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { User } from '../shared/User';
import { Item } from '../shared/Item';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

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
    this.getUsers();

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

    this.rs.getItems('spend').subscribe((data) => {
      if (!data) {
        console.error(`unable to get rewards`);
      } else {
        this.rewardItems = data;
      }
    });
  }

  getUsers() {
    this.rs.getUsers().subscribe((data) => {
      if (!data) {
        console.error(`unable to get users`);
      } else {
        this.users = data;
      }
    });
  }

  addUserDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent, { data: {} });

    dialogRef.afterClosed().subscribe((val) => {
      if (val === 'saved') {
        this.getUsers();
      }
    });
  }
}
