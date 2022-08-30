import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { RestService } from '../rest.service';
import { User } from '../User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})

export class UserCardComponent implements OnInit {

  constructor(private rs: RestService) { }
  @Input() user!: User;
  @Input() point!: number;
  @Output() pointChange = new EventEmitter<number>();

  decPoint() { this.updatePoints(-1); }
  incPoint() { this.updatePoints(+1); }

  updatePoints(delta: number) {
    // update model
    let newPoint = delta + this.point;
    this.point = newPoint >=0 ? newPoint : 0;
    this.pointChange.emit(this.point);

    // update database using the current point total from the model
    let updateData = {
      id: this.user.id,
      name: this.user.name,
      subtitle: this.user.subtitle,
      imageurl: this.user.imageurl,
      points: this.point
    };

    this.rs.updateUser(this.user.id, updateData).subscribe(data => {
      if (!data) {
        console.error(`unable to update user ${this.user.id}`);
      }
    });
  }

  ngOnInit(): void {
    this.point = this.user.points;
  }

}
