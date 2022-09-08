import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RestService } from '../rest.service';
import { Item } from '../shared/Item';
import { User } from '../shared/User';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css'],
})
export class AdminItemsComponent implements OnInit {
  earnItems: Item[] = [];
  loseItems: Item[] = [];
  rewardItems: Item[] = [];
  users: User[] = [];

  usersForm = new FormControl('');

  displayColumns: string[] = ['description', 'points', 'users'];
  pointControl = new FormControl(16, Validators.min(10));
  earnForm: FormGroup;

  constructor(private rs: RestService, private formBuilder: FormBuilder) {
    this.earnForm = new FormGroup({
      formArrayName: this.formBuilder.array([]),
    });

    // this.buildForm();
  }
  ngOnInit(): void {
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

    this.rs.getUsers().subscribe((data) => {
      if (!data) {
        console.error(`unable to get users`);
      } else {
        this.users = data;
      }
    });
  }
}
