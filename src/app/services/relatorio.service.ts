import { HttpClient } from '@angular/common/http';
import { HELP_DESK_API } from './helpdesk.api';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private http: HttpClient) { }

  pdf() {
    return this.http.get(`${HELP_DESK_API}/api/relatorio/pdf`, { responseType: 'blob' })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  imprimir(url: string): any {
    return this.http.get(`${HELP_DESK_API}` + `url`, { responseType: 'blob' })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }
      
  carregarDados(){
    return this.http.get(`${HELP_DESK_API}/api/relatorio/carregarDados`);
  }

  carregarNucleo(id:string){
    return this.http.get(`${HELP_DESK_API}/api/relatorio/carregarNucleo/${id}`);
  }

  carregarArea(id:string){
    return this.http.get(`${HELP_DESK_API}/api/relatorio/carregarNucleo/${id}`);
  }



}
