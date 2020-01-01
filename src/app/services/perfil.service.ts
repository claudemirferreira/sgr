import { HELP_DESK_API } from './helpdesk.api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  perfilUsuario() {
    return this.http.get(`${HELP_DESK_API}/api/perfil/usuario`);
  }

  getPerfil(id: number) {
    return this.http.get(`${HELP_DESK_API}/api/perfil/`+id);
  }

}