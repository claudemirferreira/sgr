import { HELP_DESK_API } from './helpdesk.api';
import { Usuario } from './../model/usuario';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Autentication } from '../model/autentication';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  page :string;
  size :string;
  param = '';

  constructor(private http: HttpClient) {}

  login(user: Autentication){
    return this.http.post(`${HELP_DESK_API}/api/auth`,user);
  }

  createOrUpdate(user: Usuario){
    if(user.id != null && user.id > 0){
      return this.http.put(`${HELP_DESK_API}/api/user`,user);
    } else {
      user.id = null;
      return this.http.post(`${HELP_DESK_API}/api/user`, user);
    }
  }  

  update(user: Usuario){
    return this.http.put(`${HELP_DESK_API}/api/user`,user);
  }

  findAll(page:number,count:number){
    return this.http.get(`${HELP_DESK_API}/api/user/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${HELP_DESK_API}/api/user/${id}`);
  }

  delete(id:number){
    return this.http.delete(`${HELP_DESK_API}/api/user/${id}`);
  }

  find(nome: string) {
    console.log('search');
    this.param = 'nome='+nome;
    
    return this.http.get(`${HELP_DESK_API}/api/user/search?`+this.param);
  }

  pesquisar(user: Usuario){
    return this.http.post(`${HELP_DESK_API}/api/user/pesquisar`,user);
  }

}