import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { Item } from './shared/Item';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:3000';

  /* CRUD operations for users */
  getUsers() {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  addUser(updatedBody: User) {
    return this.http.post<User[]>(`${this.url}/users`, updatedBody);
  }

  updateUser(userId: number, updatedBody: User) {
    return this.http.put<User>(`${this.url}/users/${userId}`, updatedBody);
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.url}/users/${userId}`);
  }

  /* CRUD operations for earning points */
  getEarnPoints() {
    return this.http.get<Item[]>(`${this.url}/earn`);
  }

  /* CRUD operations for losing points */
  getLosePoints() {
    return this.http.get<Item[]>(`${this.url}/lose`);
  }

  /* CRUD operations for spending points */
  getRewards() {
    return this.http.get<Item[]>(`${this.url}/rewards`);
  }
}
