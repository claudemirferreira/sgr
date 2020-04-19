import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  usuarioAssociacao : UsuarioAssociacao;

  areas: any;

  displayedColumnsZona: string[] = ['nome', 'usuarioZona'];

  displayedColumnsNucleo: string[] = ['nome', 'usuarioNucleo'];

  displayedColumnsArea: string[] = ['nome', 'usuarioArea'];

  message: {};
  classCss: {};
  class = 'sucess';


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      public service :UsuarioAssociacaoService,
      public usuarioService :UsuarioService) {
    this.usuarioAssociacao = data;
    this.areas = new MatTableDataSource(data.usuarioAreas);
    console.log(JSON.stringify(this.usuarioAssociacao));
  }

  ngOnInit() {
  }

  onNoClick(): void {
    //this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.areas.filter = filterValue.trim().toLowerCase();
  }

  onChangeZona(usuarioZona) {
    this.service.atualizarZona(usuarioZona).subscribe((responseApi: ResponseApi) => {
    }, err => {
      console.log('erro de autenticação='+ JSON.stringify(err.status));
      if(err.status == '400')
         this.message = 'Ja existe um usuarioZona';
      else
        this.message = 'Erro: entre em contato com o suporte';
        console.log(this.message);
    });
  }

  onChangeNucleo(usuarioNucleo) {
    this.service.atualizarNucleo(usuarioNucleo).subscribe((responseApi: ResponseApi) => {
      
    }, err => {
      console.log('erro de autenticação='+ JSON.stringify(err.status));
     
      if(err.status == '400')
         this.message = 'Ja existe um usuarioZona';
      else
        this.message = 'Erro: entre em contato com o suporte';
        console.log(this.message);
    });
  }

  onChangeArea(usuarioArea) {
    this.service.atualizarArea(usuarioArea).subscribe((responseApi: ResponseApi) => {

    }, err => {
      console.log('erro de autenticação='+ JSON.stringify(err.status));
      if(err.status == '400')
         this.message = 'Ja existe um usuarioZona';
      else
        this.message = 'Erro: entre em contato com o suporte';
        console.log(this.message);
    });
  }

  onChangeUsuario(usuario){
    this.usuarioService.update(usuario).subscribe((responseApi: ResponseApi) => {
    }, err => {
      console.log('erro de autenticação='+ JSON.stringify(err.status));
      if(err.status == '400')
         this.message = 'Ja existe um usuarioZona';
      else
        this.message = 'Erro: entre em contato com o suporte';
        console.log(this.message);
    });

  }

}
