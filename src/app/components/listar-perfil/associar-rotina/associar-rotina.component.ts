import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import { Rotina } from 'src/app/model/rotina';
import { ResponseApi } from 'src/app/model/response-api';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-associar-rotina',
  templateUrl: './associar-rotina.component.html',
  styleUrls: ['./associar-rotina.component.css']
})
export class AssociarRotinaComponent implements OnInit {
  
  selection = new SelectionModel<Rotina>(true, []);
  dataSource = new MatTableDataSource<Rotina>();

  displayedColumns: string[] = ['id', 'nome', 'checked'];
  rotinas: Rotina[];
  message: {};  
  classCss: {};

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: PerfilService) { }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
      console.log('idperfil =====================' + id);
      if (!id)
        return;
      this.service.listarRotinaPorPerfil(id).subscribe((responseApi: ResponseApi) => {
        this.rotinas = responseApi['data'];
        this.rotinas = this.rotinas;
      }, err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Rotina): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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