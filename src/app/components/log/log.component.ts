import { ResponseApi } from './../../model/response-api';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { LogService } from 'src/app/services/log.service';
import { Log } from 'src/app/model/log';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  shared: SharedService;
  log: Log;
  list: Log[];

  displayedColumns: string[] = ['nomeUsuario', 'acaoUsuario', 'dataHoraAcao'];

  message: {};
  classCss: {};

  constructor(private service: LogService,
    private router: Router) {
    this.shared = SharedService.getInstance();
    this.log = new Log();
  }

  ngOnInit(): void {

  }

  find(){
    console.log(this.log.nomeUsuario);
    console.log(this.log.dataInicio);
    console.log(this.log.dataFim);
    this.service.pesquisar(this.log).subscribe((responseApi: ResponseApi) => {
      this.list = responseApi['data'];
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });

  }

  getPerfil() {
    this.router.navigate(['/lista-rotina-perfil/' + this.shared.idPerfil]);
  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true;
  }

}
