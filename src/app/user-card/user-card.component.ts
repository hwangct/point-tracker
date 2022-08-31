import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Item } from '../Item';
import { RestService } from '../rest.service';
import { User } from '../User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  constructor(private rs: RestService) {}
  @Input() user!: User;
  @Input() point!: number;
  @Output() pointChange = new EventEmitter<number>();

  lose = new FormControl('');
  earn = new FormControl('');

  //TODO: replace w/ database
  rewardList: string[] = [];

  loseList: Item[] = [
    {
      id: 1,
      userId: [1, 2, 3],
      desc: 'Yelling or screaming when upset',
      points: 1,
    },
    {
      id: 2,
      userId: [1, 2],
      desc: 'Not listening',
      points: 1,
    },
    {
      id: 3,
      userId: [2],
      desc: 'Hitting',
      points: 2,
    },
  ];

  earnList: Item[] = [
    {
      id: 1,
      userId: [1, 2, 3, 4],
      desc: 'Putting away dishes',
      points: 1,
    },
    {
      id: 2,
      userId: [1, 2, 3, 4],
      desc: 'Put clothes away',
      points: 1,
    },
    {
      id: 3,
      userId: [1, 2, 3, 4],
      desc: 'Cleaning up a room',
      points: 2,
    },
    {
      id: 4,
      userId: [1],
      desc: 'Finishing all homework',
      points: 2,
    },
    {
      id: 5,
      userId: [1, 2],
      desc: 'Practice sport activity',
      points: 1,
    },
    {
      id: 6,
      userId: [2],
      desc: 'Take vitamins',
      points: 1,
    },
  ];

  decPoint() {
    this.updatePoints(-1);
  }

  incPoint() {
    this.updatePoints(+1);
  }

  losePoints() {
    let sum: number = 0;

    if (this.lose.value) {
      for (let value of this.lose.value) {
        sum += parseInt(value);
      }

      // clear options
      this.lose.reset();

      // update points
      this.updatePoints(-Math.abs(sum));
    }
  }

  earnPoints() {
    let sum: number = 0;

    if (this.earn.value) {
      for (let value of this.earn.value) {
        sum += parseInt(value);
      }

      // clear options
      this.earn.reset();

      // update points
      this.updatePoints(Math.abs(sum));
    }
  }

  updatePoints(delta: number) {
    // update model
    let newPoint = delta + this.point;
    this.point = newPoint >= 0 ? newPoint : 0;
    this.pointChange.emit(this.point);

    // update database using the current point total from the model
    let updateData = {
      id: this.user.id,
      name: this.user.name,
      subtitle: this.user.subtitle,
      imageurl: this.user.imageurl,
      points: this.point,
    };

    this.rs.updateUser(this.user.id, updateData).subscribe((data) => {
      if (!data) {
        console.error(`unable to update user ${this.user.id}`);
      }
    });
  }

  ngOnInit(): void {
    this.point = this.user.points;
  }
}
