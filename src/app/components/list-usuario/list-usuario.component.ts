import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'login', 'acao'];

  page: any;
  list: Usuario[];
  message: {};
  classCss: {};
  nome: string;
  usuario = new Usuario();
  shared: SharedService;
  usuarioAssociacao : UsuarioAssociacao;

  constructor(private service: UsuarioService,
    private usuarioAssociacaoService: UsuarioAssociacaoService,
    private router: Router,
    public dialog: MatDialog) {
    this.shared = SharedService.getInstance();
  }

  openDialog(idMembro: number) {    

    this.usuarioAssociacaoService.listarAssociacaoUsuario(idMembro)
      .subscribe((responseApi: ResponseApi) => {
      this.usuarioAssociacao = responseApi['data'];
      let dialogRef = this.dialog.open(AssociacaoUsuarioComponent, { data: responseApi['data'] })
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });     

    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
    
  }

  ngOnInit() {
  }

  find() {
    this.service.pesquisar(this.usuario).subscribe((responseApi: ResponseApi) => {
      this.list = responseApi['data'];
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
