import { FiltroDto } from './../model/filtro-dto';
import { HttpClient } from '@angular/common/http';
import { HELP_DESK_API } from './helpdesk.api';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private http: HttpClient) { }

  carregarDados() {
    return this.http.get(`${HELP_DESK_API}/api/relatorio/carregarDados`);
  }

  carregarNucleo(id: number) {
    return this.http.get(`${HELP_DESK_API}/api/relatorio/carregarNucleo/${id}`);
  }

  carregarArea(id: number) {
    console.log(id);
    return this.http.get(`${HELP_DESK_API}/api/relatorio/carregarArea/${id}`);
  }

  geraPdf(dto: FiltroDto) {
    return this.http.post(`${HELP_DESK_API}/api/relatorio/geraPdf`, dto, { responseType: 'blob' })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

}
