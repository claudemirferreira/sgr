import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerfilService } from 'src/app/services/perfil.service';
import { ResponseApi } from 'src/app/model/response-api';
import { PerfilDto } from 'src/app/model/perfil-dto';

@Component({
  selector: 'app-listar-perfil',
  templateUrl: './listar-perfil.component.html',
  styleUrls: ['./listar-perfil.component.css']
})
export class ListarPerfilComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'acao'];
  perfils : PerfilDto[];
  message: {};  
  classCss: {};

  constructor(private http: HttpClient,
    private service: PerfilService) { }

  ngOnInit() {
    this.listarTodos();
  }

  listarTodos() {
    this.service.listarTodos().subscribe((responseApi: ResponseApi) => {
      this.perfils = responseApi['data'];
      console.log("Areas = " + this.perfils);
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