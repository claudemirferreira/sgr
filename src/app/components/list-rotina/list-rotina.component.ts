import { MatSnackBar } from '@angular/material/snack-bar';
import { Rotina } from './../../model/rotina';
import { ResponseApi } from './../../model/response-api';
import { Router } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { RotinaService } from './../../services/rotina.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


const ELEMENT_DATA: Rotina[] = [];

@Component({
  selector: 'app-list-rotina',
  templateUrl: './list-rotina.component.html',
  styleUrls: ['./list-rotina.component.css']
})
export class ListRotinaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'acao', 'imagem', 'acoes'];

  page: any;
  //list: Rotina[];
  message: {};
  classCss: {};
  nome: string;
  rotina = new Rotina();
  shared: SharedService;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  //paginacao
  length = 0;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 20,];
  // MatPaginator Output
  pageEvent: PageEvent;
  size: 10;
  totalElements: number;
  list = new MatTableDataSource(ELEMENT_DATA);

  constructor(private service: RotinaService,
    private router: Router,
    private _snackBar: MatSnackBar) {
    this.shared = SharedService.getInstance();
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
    this.list.sort = this.sort;
    this.pageSize = 10;
    //this.size = 0;
    this.pageIndex = 0;
    this.pesquisar();
  }

  pesquisar() {
    var param = '?page='+this.pageIndex + '&size=' + this.pageSize;
    console.log(param);
    this.service.pesquisar(this.rotina, param).subscribe((responseApi: ResponseApi) => {
      this.list = new MatTableDataSource(responseApi['content']);
      this.list.sort = this.sort;

      this.totalElements = responseApi['totalElements'];
      this.pageSize = responseApi['totalPages'];
      this.pageIndex = responseApi['number'];
      this.pageSize = responseApi['size'];
    });
  }

  find() {
    this.pageIndex = 0;
    this.pesquisar();
  }

  delete(rotina: Rotina) {
    return this.service.delete(rotina.id)
      .subscribe(() => {
        console.log('saved');
        this.openSnackBar('Operação realizada com sucesso','OK');
        this.pesquisar();
      },
        error => {
          alert('Erro, existe rotina associada a este perfil');
          console.log(JSON.stringify(error));
        }

      );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
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

  getPerfil() {
    this.router.navigate(['/lista-rotina-perfil/' + this.shared.idPerfil]);
  }

}
