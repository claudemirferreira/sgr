import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PerfilService } from 'src/app/services/perfil.service';
import { UsuarioPerfil } from 'src/app/model/usuario-perfil';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-associacao-perfil',
  templateUrl: './associacao-perfil.component.html',
  styleUrls: ['./associacao-perfil.component.css']
})
export class AssociacaoPerfilComponent implements OnInit {

  displayedColumns: string[] = ['nome','checked'];

  idUsuario: number;
  list: UsuarioPerfil[];
  perfil: UsuarioPerfil;

  message: {};
  classCss: {};
  class = 'sucess';

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AssociacaoPerfilComponent>,
              public service: PerfilService,
              private ngxLoader: NgxUiLoaderService) {
    this.idUsuario = data.idUsuario;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.perfil = new UsuarioPerfil();
    this.listarUsuarioPerfil();
  }

  listarUsuarioPerfil() {
    this.ngxLoader.start();
    this.service.listarUsuarioPerfil(this.idUsuario).subscribe((responseApi: ResponseApi) => {
      this.list = responseApi['data'];
      console.log( responseApi['data']);
      this.ngxLoader.stop();
    }, err => {
      this.ngxLoader.stop();
      console.log('erro de autenticação='+ JSON.stringify(err.status));
      if(err.status == '400')
         this.message = 'Ja existe um usuarioZona';
      else
        this.message = 'Erro: entre em contato com o suporte';
        console.log(this.message);
    });
  }

  onChangePerfil(perfil) {
    this.service.atualizarPerfil(perfil).subscribe((responseApi: ResponseApi) => {

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
