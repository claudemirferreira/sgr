import { Rotina } from './../model/rotina';
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

  createOrUpdate(rotina: Rotina){
    return this.http.post(`${HELP_DESK_API}/api/rotina/`, rotina);
  }

  findAll(){
    return this.http.get(`${HELP_DESK_API}/api/rotina/`);
  }

  pesquisar(rotina: Rotina){
    return this.http.post(`${HELP_DESK_API}/api/rotina/pesquisar`,rotina);
  }

  findById(id:number){
    return this.http.get(`${HELP_DESK_API}/api/rotina/${id}`);
  }

  delete(id:number){
    return this.http.delete(`${HELP_DESK_API}/api/rotina/${id}`);
  }

}
