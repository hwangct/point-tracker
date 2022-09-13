import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';
import { RestService } from '../rest.service';
import { User } from '../shared/User';

@Component({
  selector: 'app-configure-items',
  templateUrl: './configure-items.component.html',
  styleUrls: ['./configure-items.component.css'],
})
export class ConfigureItemsComponent implements OnInit {
  users: User[] = [];
  constructor(private rs: RestService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.rs.getUsers().subscribe((data) => {
      if (!data) {
        console.error(`unable to get users`);
      } else {
        this.users = data;
      }
    });
  }

  openItemDialog(type: string) {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      data: {
        type: type,
        users: this.users,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
