import { Injectable } from '@angular/core';
import { User } from '../_model/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  regUser(user: User) {
    return this.http.post(this.baseUrl + 'users', user);
  }

  edtUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  delUser(id: number) {
    return this.http.delete(this.baseUrl + 'users/' + id);
  }
}
