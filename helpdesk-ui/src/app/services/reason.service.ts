import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reason } from '../models/reason.model';

@Injectable({
  providedIn: 'root'
})
export class ReasonService {
  baseUrl = '/api/v1/reasons/'
  reasons:any = new Map<number, string>()

  constructor(private http: HttpClient) { }

  getAllReasons() {
    this.http.get<Reason[]>(this.baseUrl).subscribe((data:Reason[]) => {
      data.forEach(reason => {
        this.reasons.set(reason.id, reason.reasonDesc)
      });
    })
    return this.reasons
  }

  getReasonById (reasonId: number): Observable<Reason> {
    return this.http.get<Reason>(this.baseUrl + reasonId)
  }
}
