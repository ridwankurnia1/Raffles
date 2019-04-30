import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Activities } from '../_model/activities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  saveActivities(activity: Activities) {
    return this.http.post(this.baseUrl + 'api/activities', activity);
  }

  getActivities(): Observable<Activities[]> {
    return this.http.get<Activities[]>(this.baseUrl + 'api/activities');
  }

  edtActivities(id: number, activity: Activities) {
    return this.http.put(this.baseUrl + 'api/activities/' + id, activity);
  }

  delActivities(activity: Activities) {
    return this.http.put(this.baseUrl + 'api/activities', activity);
  }
}
