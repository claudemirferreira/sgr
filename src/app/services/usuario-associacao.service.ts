import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HELP_DESK_API } from './helpdesk.api';
import { UsuarioZona } from '../model/usuario-zona';
import { UsuarioNucleo } from '../model/usuario-nucleo';
import { UsuarioArea } from '../model/usuario-area';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAssociacaoService {
  
  constructor(private http: HttpClient) { }

  listarAssociacaoUsuario(idMembro: number) {
    return this.http.get(`${HELP_DESK_API}/api/usuario-associacao/${idMembro}`);
  }

  atualizarZona(usuarioZona: UsuarioZona) {
    return this.http.post(`${HELP_DESK_API}/api/usuario-associacao/atualizar-zona`, usuarioZona);
  }

  atualizarNucleo(usuarioNucleo: UsuarioNucleo) {
    return this.http.post(`${HELP_DESK_API}/api/usuario-associacao/atualizar-nucleo`, usuarioNucleo);
  }

  atualizarArea(usuarioArea: UsuarioArea) {
    return this.http.post(`${HELP_DESK_API}/api/usuario-associacao/atualizar-area`, usuarioArea);
  }

}
