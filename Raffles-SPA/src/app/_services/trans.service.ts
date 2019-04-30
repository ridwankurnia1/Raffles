import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transactions } from '../_model/transactions';
import { Categories } from '../_model/categories';

@Injectable({
  providedIn: 'root'
})
export class TransService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  saveTransaction(trans: Transactions) {
    return this.http.post(this.baseUrl + 'api/transactions', trans);
  }

  getTransactions(): Observable<Transactions[]> {
    return this.http.get<Transactions[]>(this.baseUrl + 'api/transactions');
  }

  delTransactions(id) {
    return this.http.delete(this.baseUrl + 'api/transactions' + id);
  }

  saveCategories(category: Categories) {
    return this.http.post(this.baseUrl + 'api/categories', category);
  }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.baseUrl + 'api/categories');
  }

  edtCategories(id: number, category: Categories) {
    return this.http.put(this.baseUrl + 'api/categories/' + id, category);
  }

  delCategories(category: Categories) {
    return this.http.put(this.baseUrl + 'api/categories', category);
  }
}
