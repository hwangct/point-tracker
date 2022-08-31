export class Item {
  id: number;
  userId: number[];
  desc: string;
  points: number;

  constructor(id: number, userId: number[], desc: string, points: number) {
    this.id = id;
    this.userId = userId;
    this.desc = desc;
    this.points = points;
  }
}
