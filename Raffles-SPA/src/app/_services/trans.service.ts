import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transactions } from '../_model/transactions';
import { Categories } from '../_model/categories';
import { PaginatedResult } from '../_model/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  saveTransaction(trans: Transactions) {
    return this.http.post(this.baseUrl + 'transactions', trans);
  }

  getTransactions(page?, itemsPerPage?, transParams?): Observable<PaginatedResult<Transactions[]>> {
    const paginatedResult: PaginatedResult<Transactions[]> = new PaginatedResult<Transactions[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('PageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (transParams != null) {
      params = params.append('dateFr', transParams.dateFr);
      params = params.append('dateTo', transParams.dateTo);
      params = params.append('trType', transParams.trType);
      params = params.append('ActivityId', transParams.activityId);
    }

    return this.http.get<Transactions[]>(this.baseUrl + 'transactions', { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getTransRpt(transParams?): Observable<Transactions[]> {

    let params = new HttpParams();

    if (transParams != null) {
      params = params.append('dateFr', transParams.dateFr);
      params = params.append('dateTo', transParams.dateTo);
      params = params.append('trType', transParams.trType);
      params = params.append('activity', transParams.activity);
    }

    return this.http.get<Transactions[]>(this.baseUrl + 'transrpt', { observe: 'response', params})
    .pipe(
      map(response => {
        return response.body;
      })
    );
  }

  delTransactions(id) {
    return this.http.delete(this.baseUrl + 'transactions/' + id);
  }

  saveCategories(category: Categories) {
    return this.http.post(this.baseUrl + 'categories', category);
  }

  getCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.baseUrl + 'categories');
  }

  edtCategories(id: number, category: Categories) {
    return this.http.put(this.baseUrl + 'categories/' + id, category);
  }

  delCategories(category: Categories) {
    return this.http.put(this.baseUrl + 'categories', category);
  }
}
