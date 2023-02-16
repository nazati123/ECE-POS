import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl = '/api/v1/attach/data/'

  constructor(private http: HttpClient) { }

  getFile(fileId: number) {
    return this.http.get(this.baseUrl + fileId, { responseType: 'blob' })
  }
}
