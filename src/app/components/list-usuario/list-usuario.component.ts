import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { ResponseApi } from 'src/app/model/response-api';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AssociacaoUsuarioComponent } from './associacao-usuario/associacao-usuario.component';
import { UsuarioAssociacaoService } from 'src/app/services/usuario-associacao.service';
import { UsuarioAssociacao } from 'src/app/model/usuario-associacao';

import { PerfilService } from 'src/app/services/perfil.service';
import { AssociacaoPerfilComponent } from './associacao-perfil/associacao-perfil.component';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {

  displayedColumns: string[] = [ 'nome', 'login', 'status', 'in_privilegio', 'zona','nucleo', 'area', 'acao'];

  page: any;
  list: Usuario[];
  @Input() message: string | null;
  classCss: {};
  nome: string;
  usuario = new Usuario();
  shared: SharedService;
  usuarioAssociacao : UsuarioAssociacao;

  constructor(private service: UsuarioService,
    private usuarioAssociacaoService: UsuarioAssociacaoService,
    private perfilService: PerfilService,
    private router: Router,
    public dialog: MatDialog) {
    this.shared = SharedService.getInstance();
  }

  openDialogPerfil(idUsuario: number){
    let dialogRef = this.dialog.open(AssociacaoPerfilComponent, { data: {idUsuario: idUsuario}})
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

  }

  openDialogSenha(idUsuario: number){
    console.log('openDialogSenha');
    let dialogRef = this.dialog.open(AlterarSenhaComponent, { data: {idUsuario: idUsuario}})
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

  }

  openDialog(idMembro: number) {

    let dialogRef = this.dialog.open(AssociacaoUsuarioComponent, { data: {idMembro: idMembro}})
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

  ngOnInit() {
  }

  listarPerfil(id) {
    this.perfilService.listarPerfil(id).subscribe((responseApi: ResponseApi) => {
      console.log( responseApi['data']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  find() {
    this.message ='';
    this.service.pesquisar(this.usuario).subscribe((responseApi: ResponseApi) => {
      this.list = responseApi['data'];
      if (this.list.length == 0)
        this.message = 'Nenhum registro encontrado.';
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  delete(user: Usuario) {
    return this.service.delete(user.id)
      .subscribe(() => {
        console.log('saved');
        this.find();
      },
        error => {
          alert('Ocoreu um erro, entre em contato com o suporte');
          console.log(JSON.stringify(error));
        }

      );
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


  private showMessage(message: { type: string, text: string }): void {
    //this.message = message;
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
