import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PerfilRotina } from "./../../../model/perfil-rotinay";
import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { PerfilService } from "src/app/services/perfil.service";
import { ResponseApi } from "src/app/model/response-api";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: "app-associar-rotina",
  templateUrl: "./associar-rotina.component.html",
  styleUrls: ["./associar-rotina.component.css"],
})
export class AssociarRotinaComponent implements OnInit {
  selection = new SelectionModel<PerfilRotina>(true, []);
  dataSource = new MatTableDataSource<PerfilRotina>();

  displayedColumns: string[] = ["nome", "checked"];
  list: PerfilRotina[];
  idPerfil: number;
  message: {};
  classCss: {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: PerfilService,
    public dialogRef: MatDialogRef<AssociarRotinaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngxLoader: NgxUiLoaderService
  ) {
    this.idPerfil = data.idPerfil;
  }

  ngOnInit() {
    console.log(this.idPerfil)
    this.ngxLoader.start();
    this.service.listarRotina(this.idPerfil).subscribe(
      (responseApi: ResponseApi) => {
        this.list = responseApi["data"];
        console.log(this.list);
        this.ngxLoader.stop();
      },
      (err) => {
        this.ngxLoader.stop();
        this.showMessage({
          type: "error",
          text: err["error"]["errors"][0],
        });
      }
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PerfilRotina): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.idRotina + 1
    }`;
  }

  onChangePerfil(perfilRotina) {
    this.service.atualizarPerfilRotina(perfilRotina).subscribe(
      (responseApi: ResponseApi) => {},
      (err) => {
        console.log("erro de autenticação=" + JSON.stringify(err.status));
        if (err.status == "400") this.message = "Ja existe um usuarioZona";
        else this.message = "Erro: entre em contato com o suporte";
        console.log(this.message);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private showMessage(message: { type: string; text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      alert: true,
    };
    this.classCss["alert-" + type] = true;
  }
}
