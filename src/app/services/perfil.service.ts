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

  listarUsuarioPerfil() {
    return this.http.get(`${HELP_DESK_API}/api/perfil/usuario-perfil`);
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

}