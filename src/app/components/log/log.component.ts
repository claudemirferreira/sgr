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

  find(){}

  getPerfil() {
    this.router.navigate(['/lista-rotina-perfil/' + this.shared.idPerfil]);
  }

}
