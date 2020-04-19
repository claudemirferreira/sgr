import { SharedService } from './../../services/shared.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerfilService } from 'src/app/services/perfil.service';
import { ResponseApi } from 'src/app/model/response-api';
import { PerfilDto } from 'src/app/model/perfil-dto';
import { AssociarRotinaComponent } from './associar-rotina/associar-rotina.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private service: PerfilService,
    private _snackBar: MatSnackBar) {
    this.shared = SharedService.getInstance();
  }

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

  find() {
    this.message ='';
    this.service.pesquisar(this.perfil).subscribe((responseApi: ResponseApi) => {
      this.perfils = responseApi['data'];
      if (this.perfils.length == 0)
        this.message = 'Nenhum registro encontrado.';
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
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
        this.listarTodos();
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
