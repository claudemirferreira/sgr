import { Router } from '@angular/router';
import { PerfilDto } from './../../model/perfil-dto';
import { ResponseApi } from './../../model/response-api';
import { HttpClient } from '@angular/common/http';
import { PerfilService } from './../../services/perfil.service';
import { Component, OnInit } from '@angular/core';
import { Rotina } from 'src/app/model/rotina';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfils: PerfilDto[];
  message: {};
  classCss: {};

  constructor(private http: HttpClient,
    private router: Router,
    private service: PerfilService) {
    this.perfilUsuario();
  }

  ngOnInit() {     
  }

  selectRotina(rotina: Rotina){
    this.router.navigate(['/'+rotina.acao]);
  }

  selectPerfil(perfil: PerfilDto){
    this.router.navigate(['lista-rotina-perfil/'+perfil.id]);
  }

  perfilUsuario() {
    this.service.perfilUsuario().subscribe((responseApi: ResponseApi) => {
      this.perfils = responseApi['data'];
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  listarRotinas(idPerfil: number){
    this.router.navigate(['/rotina']);

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