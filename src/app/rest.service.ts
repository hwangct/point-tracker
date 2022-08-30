import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:3000";

  /* CRUD operations */
  getUsers() {
    return this.http.get<User[]>(`${this.url}/users`);
  }

  addUser(updatedBody: User) {
    return this.http.post<User[]>(`${this.url}/users`, updatedBody);
  }

  updateUser(userId: number, updatedBody: User) {
    return this.http.put<User[]>(`${this.url}/users/${userId}`, updatedBody);
  }

  deleteUser(userId: number) {
    return this.http.delete<User[]>(`${this.url}/users/${userId}`);

  }
}
