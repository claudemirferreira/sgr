import { MatSnackBar } from '@angular/material/snack-bar';
import { Rotina } from './../../model/rotina';
import { ResponseApi } from './../../model/response-api';
import { Router } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { RotinaService } from './../../services/rotina.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-rotina',
  templateUrl: './list-rotina.component.html',
  styleUrls: ['./list-rotina.component.css']
})
export class ListRotinaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'acao'];

  page: any;
  list: Rotina[];
  message: {};
  classCss: {};
  nome: string;
  rotina = new Rotina();
  shared: SharedService;

  constructor(private service: RotinaService,
    private router: Router,
    private _snackBar: MatSnackBar) {
    this.shared = SharedService.getInstance();
    this.findAll();
  }

  ngOnInit() {
  }

  findAll() {
    this.service.findAll().subscribe((responseApi: ResponseApi) => {
      this.list = responseApi['data'];

    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  find() {
    console.log(this.rotina.nome);
    this.service.pesquisar(this.rotina).subscribe((responseApi: ResponseApi) => {
      this.list = responseApi['data'];
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  delete(rotina: Rotina) {
    return this.service.delete(rotina.id)
      .subscribe(() => {
        console.log('saved');
        this.openSnackBar('Operação realizada com sucesso','OK');
        this.findAll();
      },
        error => {
          alert('Erro, existe rotina associada a este perfil');
          console.log(JSON.stringify(error));
        }

      );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
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

  getPerfil() {
    this.router.navigate(['/lista-rotina-perfil/' + this.shared.idPerfil]);
  }

}
