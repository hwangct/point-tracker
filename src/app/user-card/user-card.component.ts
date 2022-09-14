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

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  constructor(
    private rs: RestService,
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

  losePoints() {
    let sum = 0;

    if (this.lose.value) {
      for (let value of this.lose.value) {
        sum += parseInt(value);
      }

      // add dialog confirmation
      this.openDialog('lose', sum, this.point);

      // update and reset
      this.updatePoints(-Math.abs(sum));
      this.lose.reset();
    }
  }

  earnPoints() {
    let sum = 0;

    if (this.earn.value) {
      for (let value of this.earn.value) {
        sum += parseInt(value);
      }

      this.openDialog('earn', sum, this.point);

      // update and reset
      this.updatePoints(Math.abs(sum));
      this.earn.reset();
    }
  }

  spendPoints() {
    let sum = 0;

    if (this.spend.value) {
      for (let value of this.spend.value) {
        sum += parseInt(value);
      }

      // Check before update
      if (sum > this.point) {
        this.openDialog('error', sum, this.point);
      } else {
        this.openDialog('spend', sum, this.point);

        // update and reset
        this.updatePoints(-Math.abs(sum));
        this.spend.reset();
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
