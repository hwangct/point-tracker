import {
  Component,
  Inject,
  Input,
  Output,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Item } from '../shared/Item';
import { RestService } from '../rest.service';
import { User } from '../shared/User';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserActivitiesDialogComponent } from '../user-activities-dialog/user-activities-dialog.component';
import { ActivityService } from '../activity.service';
import { Activity } from '../shared/Activity';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  constructor(
    private rs: RestService,
    private as: ActivityService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  @Input() user!: User;
  @Input() earnItems!: Item[];
  @Input() loseItems!: Item[];
  @Input() rewardItems!: Item[];
  @Input() point!: number;
  @Input() edit!: boolean;
  @Output() pointChange = new EventEmitter<number>();
  @Output() refreshUsers = new EventEmitter<any>();

  lose = new FormControl('');
  earn = new FormControl('');
  spend = new FormControl('');

  selectedLoseItems: Item[];
  selectedEarnItems: Item[];
  selectedSpendItems: Item[];

  comparer(o1: Item, o2: Item): boolean {
    return o1 && o2 ? o1.desc === o2.desc : o2 === o2;
  }

  decPoint() {
    this.updatePoints(-1);
  }

  incPoint() {
    this.updatePoints(+1);
  }

  openDialog(type: string, sum: number, points: number) {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        type: type,
        sum: sum,
        points: points,
      },
    });
  }

  getDate() {
    let today = new Date();
    let todayStr = null;
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    todayStr = yyyy + '-' + mm + '-' + dd;
    return todayStr;
  }

  saveActivity(userid: string, desc: string, points: number, type: string) {
    let activity = new Activity(userid, desc, points, type, this.getDate());

    this.as.addActivityById(activity).subscribe({
      next: (res) => {},
      error: (res) => {
        console.error(`Unable to save activity!`);
      },
    });
  }

  losePoints() {
    let sum = 0;
    let type = 'lose';

    if (this.selectedLoseItems.length > 0) {
      for (let item of this.selectedLoseItems) {
        sum += item.points;
        // save to database
        this.saveActivity(this.user.id, item.desc, item.points, type);
      }

      // add dialog confirmation
      this.openDialog(type, sum, this.point);

      // update and reset
      this.updatePoints(-Math.abs(sum));
      this.selectedLoseItems = [];
    }
  }

  earnPoints() {
    let sum = 0;
    let type = 'earn';

    if (this.selectedEarnItems.length > 0) {
      for (let item of this.selectedEarnItems) {
        sum += item.points;
        // save to database
        this.saveActivity(this.user.id, item.desc, item.points, type);
      }

      this.openDialog(type, sum, this.point);

      // update and reset
      this.updatePoints(Math.abs(sum));
      this.selectedEarnItems = [];
    }
  }

  spendPoints() {
    let sum = 0;
    let type = 'spend';

    if (this.selectedSpendItems.length > 0) {
      for (let item of this.selectedSpendItems) {
        sum += item.points;
        // save to database
        this.saveActivity(this.user.id, item.desc, item.points, type);
      }

      // Check before update
      if (sum > this.point) {
        this.openDialog('error', sum, this.point);
      } else {
        this.openDialog(type, sum, this.point);

        // update and reset
        this.updatePoints(-Math.abs(sum));
        this.selectedSpendItems = [];
      }
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

    this.rs.editUser(this.user.id, updateData).subscribe((data) => {
      if (!data) {
        console.error(`unable to update user ${this.user.id}`);
      }
    });
  }

  ngOnInit(): void {
    this.point = this.user.points;
    this.selectedEarnItems = [];
    this.selectedLoseItems = [];
    this.selectedSpendItems = [];

    // Filter based on user
    this.earnItems = this.earnItems.filter((item) =>
      item.users.includes(this.user.id)
    );

    this.loseItems = this.loseItems.filter((item) =>
      item.users.includes(this.user.id)
    );

    this.rewardItems = this.rewardItems.filter((item) =>
      item.users.includes(this.user.id)
    );
  }

  editUser(user: User) {
    this.dialog
      .open(UserDialogComponent, {
        data: {
          editData: user,
        },
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'saved') {
          this.refreshUsers.next(null);
        }
      });
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.rs.deleteUser(id).subscribe({
          next: (res) => {
            this._snackBar.open(`Deleted user!`, 'Dismiss', {
              duration: 3000,
            });
            this.refreshUsers.next(null);
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

  getActivitiesByUser(userId: string) {
    const dialogRef = this.dialog.open(UserActivitiesDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'my-dialog',
      data: {
        name: userId,
      },
    });
  }
}

// TODO: Move Confirmation Dialog
export interface DialogData {
  type: 'lose' | 'earn' | 'spend' | 'error';
  sum: number;
  points: number;
}

@Component({
  selector: 'dialog-confirmation',
  templateUrl: 'dialog-confirmation.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
