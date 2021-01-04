import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ResponseApi } from "./../../../model/response-api";
import { Usuario } from "./../../../model/usuario";
import { UsuarioService } from "./../../../services/usuario.service";
import { AssociacaoPerfilComponent } from "./../associacao-perfil/associacao-perfil.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, OnInit, Inject } from "@angular/core";

@Component({
  selector: "app-alterar-senha",
  templateUrl: "./alterar-senha.component.html",
  styleUrls: ["./alterar-senha.component.css"],
})
export class AlterarSenhaComponent implements OnInit {
  usuario: Usuario;
  idUsuario: number;
  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AssociacaoPerfilComponent>,
    public service: UsuarioService,
    private formBuilder: FormBuilder
  ) {
    this.idUsuario = data.idUsuario;
  }

  ngOnInit(): void {
    this.service.findById(this.idUsuario).subscribe(
      (responseApi: ResponseApi) => {
        this.usuario = responseApi["data"];
        this.usuario.senha = '';
        this.createForm();
        console.log(JSON.stringify(this.usuario));
      },
      (err) => {
        console.log("ocorreu um erro");
      }
    );
  }

  alterarSenha() {
    this.service.alterarSenha(this.usuario).subscribe(
      (responseApi: ResponseApi) => {
        console.log(responseApi["data"]);
        this.onNoClick();
      },
      (err) => {
        console.log("erro de autenticação=" + JSON.stringify(err.status));
        if (err.status == "400") console.log("Ja existe um usuarioZona");
        else console.log();
      }
    );
  }

  cancel(event) {
    event.preventDefault();
    this.onNoClick();
}

  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      senha: [null, Validators.required],
    });
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      "form-group": true,
      "has-error": isInvalid && isDirty,
      "has-success": !isInvalid && isDirty,
    };
  }
}
