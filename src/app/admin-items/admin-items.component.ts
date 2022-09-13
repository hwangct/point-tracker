import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { RestService } from '../rest.service';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.css'],
})
export class AdminItemsComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  @Input() type!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['description', 'points', 'actions'];
  pointControl = new FormControl(Validators.min(10));
  // earnForm: FormGroup;

  constructor(private rs: RestService) {
    // this.earnForm = new FormGroup({
    //   formArrayName: this.formBuilder.array([]),
    // });
  }

  ngOnInit(): void {
    this.rs.getItems(this.type).subscribe((data) => {
      if (!data) {
        console.error(`unable to get ways to earn items`);
      } else {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
}
