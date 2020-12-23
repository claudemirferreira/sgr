import { Injectable } from '@angular/core';
import { HELP_DESK_API } from './helpdesk.api';
import { FiltroDto } from '../model/filtro-dto';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembroService {

  constructor(private http: HttpClient) { }

  find(dto: FiltroDto) {
    return this.http.post(`${HELP_DESK_API}/api/membro/find`, dto)
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  getMembro(id: number) {
    return this.http.get(`${HELP_DESK_API}/api/membro/`+id);
  }
}
