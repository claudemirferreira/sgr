import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { ResponseApi } from 'src/app/model/response-api';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AssociacaoUsuarioComponent } from './associacao-usuario/associacao-usuario.component';
import { UsuarioAssociacaoService } from 'src/app/services/usuario-associacao.service';
import { UsuarioAssociacao } from 'src/app/model/usuario-associacao';

import { PerfilService } from 'src/app/services/perfil.service';
import { AssociacaoPerfilComponent } from './associacao-perfil/associacao-perfil.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';


export interface IUsuario {
  id: number;
  login: string;
  senha: string;
  status: string;
  telefone: string;
  email: string;
  nome: string;
  idMembro: number;
  zona: boolean;
  nucleo: boolean;
  area: boolean;
  in_privilegio: boolean;
}

const ELEMENT_DATA: IUsuario[] = [];

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {


  displayedColumns: string[] = ['nome', 'login', 'status', 'in_privilegio', 'zona', 'nucleo', 'area', 'acao'];
  usuario = new Usuario();
  shared: SharedService;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() message: string | null;

  //paginacao
  length = 0;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 20,];
  // MatPaginator Output
  pageEvent: PageEvent;
  size: 10;
  totalElements: number;
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor( private service: UsuarioService,
    private usuarioAssociacaoService: UsuarioAssociacaoService,
    private perfilService: PerfilService,
    private router: Router,
    private dialog: MatDialog ){
      this.shared = SharedService.getInstance();
      this.usuario.nome = '';
      this.usuario.login = '';
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  pageChange($event) {
    console.log("############## pageChange");
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex
    this.pesquisar();
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.pageSize = 10;

    this.size = 10;
    this.pageIndex = 1;
  }

  find() {
    this.pageIndex = 1;
    this.pesquisar();
  }

  pesquisar() {
    var param = '?page='+this.pageIndex + '&size=' + this.size;
    console.log(param);
    this.service.pesquisar(this.usuario, param).subscribe((responseApi: ResponseApi) => {
      this.dataSource = new MatTableDataSource(responseApi['content']);
      this.dataSource.sort = this.sort;

      this.totalElements = responseApi['totalElements'];
      this.pageSize = responseApi['totalPages'];
      this.pageIndex = responseApi['number'];
      this.size = responseApi['size'];
    });
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

  getPerfil() {
    this.router.navigate(['/lista-rotina-perfil/' + this.shared.idPerfil]);
  }

}
