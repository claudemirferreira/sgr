import { HttpClient } from '@angular/common/http';
import { HELP_DESK_API } from './helpdesk.api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RotinaService {

  constructor(private http: HttpClient) { }

  listarRotinasPorPerfil(idPerfil: number) {
    return this.http.get(`${HELP_DESK_API}/api/rotina/{idPerfil}`);
  }

}