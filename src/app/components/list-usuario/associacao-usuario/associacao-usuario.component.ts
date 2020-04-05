import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioAssociacao } from 'src/app/model/usuario-associacao';
import { UsuarioAssociacaoService } from 'src/app/services/usuario-associacao.service';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-associacao-usuario',
  templateUrl: './associacao-usuario.component.html',
  styleUrls: ['./associacao-usuario.component.css']
})
export class AssociacaoUsuarioComponent implements OnInit {

  usuarioAssociacao : UsuarioAssociacao;
  displayedColumnsZona: string[] = ['nome', 'usuarioZona'];

  displayedColumnsNucleo: string[] = ['nome', 'usuarioNucleo'];

  displayedColumnsArea: string[] = ['nome', 'usuarioArea'];

  message: {};
  classCss: {};
  class = 'sucess';


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      public service :UsuarioAssociacaoService) { 
    this.usuarioAssociacao = data;
    console.log(JSON.stringify(this.usuarioAssociacao));
  }

  ngOnInit() {
  }

  onChangeZona(usuarioZona) {
    //this.message = '';
    this.service.atualizarZona(usuarioZona).subscribe((responseApi: ResponseApi) => {
      //this.usuarioZona = responseApi['data'];
      //this.class = 'sucess';
      //this.message = 'Operacao realizada com sucesso';
    }, err => {
      console.log('erro de autenticação='+ JSON.stringify(err.status));
      //this.erro =  err.status;
      //console.log(this.erro.status);
      //this.class = 'error';
      if(err.status == '400')
         this.message = 'Ja existe um usuarioZona';
      else
        this.message = 'Erro: entre em contato com o suporte';
        console.log(this.message);
    });
  }

  onChangeNucleo(usuarioNucleo) {
    //this.message = '';
    this.service.atualizarNucleo(usuarioNucleo).subscribe((responseApi: ResponseApi) => {
      //this.usuarioZona = responseApi['data'];
      //this.class = 'sucess';
      //this.message = 'Operacao realizada com sucesso';
    }, err => {
      console.log('erro de autenticação='+ JSON.stringify(err.status));
      //this.erro =  err.status;
      //console.log(this.erro.status);
      //this.class = 'error';
      if(err.status == '400')
         this.message = 'Ja existe um usuarioZona';
      else
        this.message = 'Erro: entre em contato com o suporte';
        console.log(this.message);
    });
  }

  onChangeArea(usuarioArea) {
    //this.message = '';
    this.service.atualizarArea(usuarioArea).subscribe((responseApi: ResponseApi) => {
      //this.usuarioZona = responseApi['data'];
      //this.class = 'sucess';
      //this.message = 'Operacao realizada com sucesso';
    }, err => {
      console.log('erro de autenticação='+ JSON.stringify(err.status));
      //this.erro =  err.status;
      //console.log(this.erro.status);
      //this.class = 'error';
      if(err.status == '400')
         this.message = 'Ja existe um usuarioZona';
      else
        this.message = 'Erro: entre em contato com o suporte';
        console.log(this.message);
    });
  }
  
}
