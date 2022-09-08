import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { User } from '../shared/User';
import { Item } from '../shared/Item';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  constructor(private rs: RestService) {}
  users: User[] = [];
  earnItems: Item[] = [];
  loseItems: Item[] = [];
  rewardItems: Item[] = [];
  edit: boolean = false;

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

    this.rs.getEarnPoints().subscribe((data) => {
      if (!data) {
        console.error(`unable to get ways to earn points`);
      } else {
        this.earnItems = data;
      }
    });

    this.rs.getLosePoints().subscribe((data) => {
      if (!data) {
        console.error(`unable to get ways to lose points`);
      } else {
        this.loseItems = data;
      }
    });

    this.rs.getRewards().subscribe((data) => {
      if (!data) {
        console.error(`unable to get rewards`);
      } else {
        this.rewardItems = data;
      }
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
