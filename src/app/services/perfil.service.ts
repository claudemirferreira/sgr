import { PerfilDto } from './../model/perfil-dto';
import { HELP_DESK_API } from './helpdesk.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioPerfil } from '../model/usuario-perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  perfilUsuario() {
    return this.http.get(`${HELP_DESK_API}/api/perfil/usuario`);
  }

  listarUsuarioPerfil(id: number) {
    return this.http.get(`${HELP_DESK_API}/api/perfil/usuario-perfil/`+id);
  }

  atualizarPerfil(usuarioPerfil: UsuarioPerfil) {
    return this.http.post(`${HELP_DESK_API}/api/perfil/atualizar-perfil`, usuarioPerfil);
  }

  listarTodos() {
    return this.http.get(`${HELP_DESK_API}/api/perfil/`);
  }

  getPerfil(id: number) {
    return this.http.get(`${HELP_DESK_API}/api/perfil/`+id);
  }

  listarRotinaPorPerfil(id: number) {
    return this.http.get(`${HELP_DESK_API}/api/perfil/listarRotinaPorPerfil/`+id);
  }

  listarPerfil(id: number) {
    return this.http.get(`${HELP_DESK_API}/api/perfil/usuario-perfil/`+id);
  }

  pesquisar(perfil: PerfilDto){
    return this.http.post(`${HELP_DESK_API}/api/perfil/pesquisar`,perfil);
  }

  delete(id:number){
    return this.http.delete(`${HELP_DESK_API}/api/perfil/`+id);
  }

  create(perfil: PerfilDto){
    return this.http.post(`${HELP_DESK_API}/api/perfil/`,perfil);
  }

  listarRotina(idPerfil: number) {
    return this.http.get(`${HELP_DESK_API}/api/perfil/perfil-rotina/`+idPerfil);
  }

}
