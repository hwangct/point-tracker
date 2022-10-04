import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from './shared/Activity';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  url: string = environment.activityUrl;

  /* CRUD operations for activities */
  getAllActivities() {
    return this.http.get<Activity[]>(`${this.url}/activities`);
  }

  getAllActivitiesByName(name: string) {
    return this.http.get<Activity[]>(`${this.url}/activities/userid/${name}`);
  }

  getActivityById(id: number) {
    return this.http.get<Activity[]>(`${this.url}/activities/${id}`);
  }

  addActivityById(updatedBody: Activity) {
    return this.http.post<Activity[]>(`${this.url}/activities`, updatedBody);
  }

  editActivityById(id: number, updatedBody: Activity) {
    return this.http.put<Activity>(`${this.url}/activities/${id}`, updatedBody);
  }

  deleteActivityById(id: number) {
    return this.http.delete(`${this.url}/activities/${id}`);
  }
}
