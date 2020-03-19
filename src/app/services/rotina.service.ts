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
    if(rotina.id != null && rotina.id != 0){
      return this.http.put(`${HELP_DESK_API}/api/rotina`,rotina);
    } else {
      rotina.id = null;
      return this.http.post(`${HELP_DESK_API}/api/rotina`, rotina);
    }
  }

  findAll(){
    return this.http.get(`${HELP_DESK_API}/api/rotina/`);
  }

  pesquisar(rotina: Rotina){
    return this.http.post(`${HELP_DESK_API}/api/rotina/pesquisar`,rotina);
  }

  findById(id:string){
    return this.http.get(`${HELP_DESK_API}/api/rotina/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${HELP_DESK_API}/api/rotina/${id}`);
  }

}