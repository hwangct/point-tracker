import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { User } from '../User';
import { Item } from '../Item';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  constructor(private rs: RestService) {}
  users: User[] = [];
  earn: Item[] = [];
  lose: Item[] = [];
  rewards: Item[] = [];

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
        this.earn = data;
      }
    });

    this.rs.getLosePoints().subscribe((data) => {
      if (!data) {
        console.error(`unable to get ways to lose points`);
      } else {
        this.lose = data;
      }
    });

    this.rs.getRewards().subscribe((data) => {
      if (!data) {
        console.error(`unable to get rewards`);
      } else {
        this.rewards = data;
      }
    });
  }

  /** TODO: Delete Temporary test functions */
  addUser() {
    let createData = {
      id: 4,
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

  deleteUser(userId: number) {
    this.rs.deleteUser(userId).subscribe((data) => {
      if (!data) {
        console.error(`unable to delete user ${userId}`);
      } else {
        const index = this.users.map((object) => object.id).indexOf(userId);
        this.users.splice(index, 1);
      }
    });
  }
}
