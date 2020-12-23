import { Log } from '../model/log';
import { HttpClient } from '@angular/common/http';
import { HELP_DESK_API } from './helpdesk.api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  pesquisar(log: Log) {
    return this.http.post(`${HELP_DESK_API}/api/log/pesquisar`, log);
  }

}
