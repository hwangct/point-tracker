import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css'],
})
export class AddUserDialogComponent implements OnInit {
  userForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private rs: RestService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      desc: ['', Validators.required],
      points: [null, Validators.min(0)],
    });
  }

  addUser(user: string) {
    console.log(this.userForm.value);

    this.rs.addUser(this.userForm.value).subscribe({
      next: (res) => {
        // this.users.push(createData);
        this.dialogRef.close();
        this._snackBar.open(`Added ${user}`, 'Dismiss', {
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

  checkUserExists(): boolean {
    let userExists = false;

    return userExists;
  }
}
