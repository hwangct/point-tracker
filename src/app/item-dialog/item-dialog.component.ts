import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from '../rest.service';
import { User } from '../shared/User';

export interface ItemDialogData {
  type: 'lose' | 'earn' | 'spend';
  users: User[];
}

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css'],
})
export class ItemDialogComponent implements OnInit {
  itemForm!: FormGroup;
  @Input() type!: string;

  constructor(
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    private rs: RestService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ItemDialogData,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      desc: ['', Validators.required],
      points: [null, Validators.min(1)],
      users: [[], Validators.required],
    });
  }

  addItem() {
    this.rs.addItems(this.itemForm.value, this.data.type).subscribe({
      next: (res) => {
        this.dialogRef.close();
        this._snackBar.open(`Added item`, 'Dismiss', {
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
