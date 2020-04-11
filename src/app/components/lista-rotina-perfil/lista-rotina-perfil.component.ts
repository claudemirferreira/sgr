import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfilDto } from './../../model/perfil-dto';
import { ResponseApi } from './../../model/response-api';
import { HttpClient } from '@angular/common/http';
import { PerfilService } from './../../services/perfil.service';
import { Rotina } from 'src/app/model/rotina';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-lista-rotina-perfil',
  templateUrl: './lista-rotina-perfil.component.html',
  styleUrls: ['./lista-rotina-perfil.component.css']
})
export class ListaRotinaPerfilComponent implements OnInit {
  
  perfils: PerfilDto[];
  message: {};
  classCss: {};

  perfil: PerfilDto;
  rotinas: Rotina[];  
  shared : SharedService;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: PerfilService) { 
      this.shared = SharedService.getInstance();
    }


  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
      this.shared.idPerfil = params['id'];
      console.log('idperfil =====================' + id);
      if (!id)
        return;
      this.service.getPerfil(this.shared.idPerfil).subscribe((responseApi: ResponseApi) => {
      this.perfil = responseApi['data'];
      this.rotinas = this.perfil.rotinas;
      }, err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
    });
  }

  selectRotina(rotina: Rotina){
    this.router.navigate(['/'+rotina.acao]);
  }

  getPerfil() {
    this.service.perfilUsuario().subscribe((responseApi: ResponseApi) => {
      this.perfils = responseApi['data'];
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  listarRotinas(idPerfil: number) {
    this.router.navigate(['/rotina']);
    console.log('##########' + idPerfil);

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
