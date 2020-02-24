import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'acao'];

  page : any;
  list: Usuario[];
  message: {};
  classCss: {};
  nome: string;

  constructor(private service: UsuarioService,
    private router: Router) { 
      this.nome = 'admin';
      this.find();
    }

  ngOnInit() {
  }

  find() {
    this.service.find(this.nome).subscribe((responseApi: ResponseApi) => {
      this.list = responseApi['data'];      // pageable

      console.log("title = " + JSON.stringify(this.list));

    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
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

}
