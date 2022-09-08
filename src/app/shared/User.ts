export class User {
  id: string;
  name: string;
  subtitle: string;
  imageurl: string;
  points: number;

  constructor(
    id: string,
    name: string,
    subtitle: string,
    imageurl: string,
    points: number
  ) {
    this.id = id;
    this.name = name;
    this.subtitle = subtitle;
    this.imageurl = imageurl;
    this.points = points;
  }
}
