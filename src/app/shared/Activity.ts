export class Activity {
  // id: number;
  userId: string;
  activityName: string;
  activityPoints: number;
  activityType: string;
  activityDate: string;

  constructor(
    // id: number,
    userId: string,
    activityName: string,
    activityPoints: number,
    activityType: string,
    activityDate: string
  ) {
    // this.id = id;
    this.userId = userId;
    this.activityName = activityName;
    this.activityPoints = activityPoints;
    this.activityType = activityType;
    this.activityDate = activityDate;
  }
}
