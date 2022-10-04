import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from '../rest.service';
import { User } from '../shared/User';

export interface UserDialogData {
  editData: User;
}

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css'],
})
export class UserDialogComponent implements OnInit {
  userForm!: FormGroup;
  action: string = 'Add';

  constructor(
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private rs: RestService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      subtitle: ['', Validators.required],
      points: [null, [Validators.required, Validators.min(0)]],
    });

    if (this.data.editData) {
      this.userForm.controls['id'].setValue(this.data.editData.id);
      this.userForm.controls['name'].setValue(this.data.editData.name);
      this.userForm.controls['subtitle'].setValue(this.data.editData.subtitle);
      this.userForm.controls['points'].setValue(this.data.editData.points);

      this.action = 'Edit';
    }
  }

  saveUser() {
    if (this.data.editData) {
      this.rs.editUser(this.data.editData.id, this.userForm.value).subscribe({
        next: (res) => {
          this.dialogRef.close('saved');
          this._snackBar.open(`Edited user!`, 'Dismiss', {
            duration: 3000,
          });
        },
        error: (res) => {
          this._snackBar.open(`Server Error occurred!`, 'Dismiss', {
            duration: 3000,
          });
          console.error(`Server Error: ${res.error}`);
        },
      });
    } else {
      this.rs.addUser(this.userForm.value).subscribe({
        next: (res) => {
          this.dialogRef.close('saved');
          this._snackBar.open(`Added user!`, 'Dismiss', {
            duration: 3000,
          });
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

  // TODO: use for validation checks
  //   checkUserExists(): boolean {
  //     let userExists = false;

  //     return userExists;
  //   }
}
