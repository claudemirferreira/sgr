import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioAssociacao } from 'src/app/model/usuario-associacao';
import { UsuarioAssociacaoService } from 'src/app/services/usuario-associacao.service';
import { ResponseApi } from 'src/app/model/response-api';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-associacao-usuario',
  templateUrl: './associacao-usuario.component.html',
  styleUrls: ['./associacao-usuario.component.css']
})
export class AssociacaoUsuarioComponent implements OnInit {

  usuarioAssociacao: UsuarioAssociacao;
  idMembro: number;

  areas: any;

  displayedColumnsZona: string[] = ['nome', 'usuarioZona'];

  displayedColumnsNucleo: string[] = ['nome', 'usuarioNucleo'];

  displayedColumnsArea: string[] = ['nome', 'usuarioArea'];

  message: {};
  classCss: {};
  class = 'sucess';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AssociacaoUsuarioComponent>,
    public service: UsuarioAssociacaoService,
    public usuarioService: UsuarioService,
    private ngxLoader: NgxUiLoaderService) {
    this.idMembro = data.idMembro;
  }

  lista() {
    this.ngxLoader.start();
    this.service.listarAssociacaoUsuario(this.idMembro)
      .subscribe((responseApi: ResponseApi) => {
        this.usuarioAssociacao = responseApi['data'];
        this.areas = new MatTableDataSource(this.usuarioAssociacao.usuarioAreas);
        this.ngxLoader.stop();

      }, err => {
        this.ngxLoader.stop();
        console.log('ocorreu um erro');
      });
  }

  ngOnInit() {
    this.lista();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.areas.filter = filterValue.trim().toLowerCase();
  }

  onChangeZona(usuarioZona) {
    this.service.atualizarZona(usuarioZona).subscribe((responseApi: ResponseApi) => {
    }, err => {
      console.log('erro de autenticação=' + JSON.stringify(err.status));
      if (err.status == '400')
        this.message = 'Ja existe um usuarioZona';
      else
        this.message = 'Erro: entre em contato com o suporte';
      console.log(this.message);
    });
  }

  onChangeNucleo(usuarioNucleo) {
    this.service.atualizarNucleo(usuarioNucleo).subscribe((responseApi: ResponseApi) => {

    }, err => {
      console.log('erro de autenticação=' + JSON.stringify(err.status));

      if (err.status == '400')
        this.message = 'Ja existe um usuarioZona';
      else
        this.message = 'Erro: entre em contato com o suporte';
      console.log(this.message);
    });
  }

  onChangeArea(usuarioArea) {
    this.service.atualizarArea(usuarioArea).subscribe((responseApi: ResponseApi) => {

    }, err => {
      console.log('erro de autenticação=' + JSON.stringify(err.status));
      if (err.status == '400')
        this.message = 'Ja existe um usuarioZona';
      else
        this.message = 'Erro: entre em contato com o suporte';
      console.log(this.message);
    });
  }

  onChangeUsuario(usuario) {
    this.usuarioService.updateUser(usuario).subscribe((responseApi: ResponseApi) => {
    }, err => {
      console.log('erro de autenticação=' + JSON.stringify(err.status));
      if (err.status == '400')
        this.message = 'Ja existe um usuarioZona';
      else
        this.message = 'Erro: entre em contato com o suporte';
      console.log(this.message);
    });

  }

}
