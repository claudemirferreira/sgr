import { SharedService } from './../../services/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerfilService } from 'src/app/services/perfil.service';
import { ResponseApi } from 'src/app/model/response-api';
import { PerfilDto } from 'src/app/model/perfil-dto';
import { AssociarRotinaComponent } from './associar-rotina/associar-rotina.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';


const ELEMENT_DATA: PerfilDto[] = [];

@Component({
  selector: 'app-listar-perfil',
  templateUrl: './listar-perfil.component.html',
  styleUrls: ['./listar-perfil.component.css']
})
export class ListarPerfilComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'imagem', 'acao'];
  perfils : PerfilDto[];
  perfil = new PerfilDto();

  shared: SharedService;

  message: {};
  classCss: {};

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  //paginacao
  length = 0;
  pageSize = 10;
  pageIndex = 1;
  pageSizeOptions: number[] = [5, 10, 20,];
  // MatPaginator Output
  pageEvent: PageEvent;
  totalElements: number;
  list = new MatTableDataSource(ELEMENT_DATA);


  constructor(private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private service: PerfilService,
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
    this.pageIndex = 0;
    this.pesquisar();
  }

  pesquisar() {
    var param = '?page='+this.pageIndex + '&size=' + this.pageSize;
    console.log(param);
    this.service.pesquisar(this.perfil, param).subscribe((responseApi: ResponseApi) => {
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


  openDialogRotina(idPerfil: number){
    console.log('openDialogPerfil idPerfil=' + idPerfil);
    let dialogRef = this.dialog.open(AssociarRotinaComponent, { data: {idPerfil: idPerfil} } )
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

  }

  delete(perfil: PerfilDto) {
    return this.service.delete(perfil.id)
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

  getPerfil() {
    this.router.navigate(['/lista-rotina-perfil/' + this.shared.idPerfil]);
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
