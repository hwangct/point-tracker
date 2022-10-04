import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LegendPosition } from '@swimlane/ngx-charts';

import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-user-activities-dialog',
  templateUrl: './user-activities-dialog.component.html',
  styleUrls: ['./user-activities-dialog.component.css'],
})
export class UserActivitiesDialogComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  user: string;

  public ngOnInit() {
    this.getAllActivitiesForUser();
  }
  single: any[];
  multi: any[];
  losePie: any[];
  allPie: any[];
  allPieTest: any[];
  allEarnPts = 10;
  allLosePts = 10;
  allSpendPts = 10;

  // pie chart options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  view: [number, number] = [400, 200];

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };
  cardColor: string = '#232837';

  // options
  legend: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  public legendPos: LegendPosition = LegendPosition.Below;

  constructor(
    private as: ActivityService,
    public dialogRef: MatDialogRef<UserActivitiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserActivitiesDialogModel
  ) {
    this.user = data.name;
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  percentageFormatting(c: number) {
    return Math.round(c);
  }

  getAllActivitiesForUser() {
    this.as.getAllActivitiesByName(this.user).subscribe({
      next: (res) => {
        const userLoseActivities = res.filter(
          (activity) => activity.activityType === 'lose'
        );
        if (userLoseActivities) {
          this.allLosePts = userLoseActivities.reduce(
            (acc, activity) => acc + activity.activityPoints,
            0
          );
          // this.allPie.push({ name: 'lose', value: allLosePts });
          // TODO:  break down into data for cards
          // this.losePie = allPie.map((activity) => {
          //   return {
          //     name: activity.activityType,
          //     value: activity.activityPoints,
          //   };
          // });
        }

        const userEarnActivities = res.filter(
          (activity) => activity.activityType === 'earn'
        );
        if (userEarnActivities) {
          this.allEarnPts = userEarnActivities.reduce(
            (acc, activity) => acc + activity.activityPoints,
            0
          );
          // this.allPie.push({ name: 'earn', value: allEarnPts });
          // TODO:  break down into data for cards
          // this.losePie = allPie.map((activity) => {
          //   return {
          //     name: activity.activityType,
          //     value: activity.activityPoints,
          //   };
          // });
        }
        const userSpendActivities = res.filter(
          (activity) => activity.activityType === 'spend'
        );
        if (userSpendActivities) {
          this.allSpendPts = userSpendActivities.reduce(
            (acc, activity) => acc + activity.activityPoints,
            0
          );
          // this.allPie.push({ name: 'earn', value: allEarnPts });
          // TODO:  break down into data for cards
          // this.losePie = allPie.map((activity) => {
          //   return {
          //     name: activity.activityType,
          //     value: activity.activityPoints,
          //   };
          // });
        }

        this.single = [
          {
            name: 'earn',
            value: this.allEarnPts,
          },
          {
            name: 'lose',
            value: this.allLosePts,
          },
          {
            name: 'spend',
            value: this.allSpendPts,
          },
        ];
      },
      error: (res) => {
        console.error(`Unable to get items!`);
      },
    });
  }
}

export class UserActivitiesDialogModel {
  constructor(public name: string) {}
}
