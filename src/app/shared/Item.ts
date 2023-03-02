export class Item {
  id: number;
  users: string[];
  desc: string;
  points: number;

  constructor(id: number, users: string[], desc: string, points: number) {
    this.id = id;
    this.users = users;
    this.desc = desc;
    this.points = points;
  }
}
