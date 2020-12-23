import { Component, OnInit } from '@angular/core';
import { PerfilDto } from 'src/app/model/perfil-dto';
import { SharedService } from 'src/app/services/shared.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseApi } from 'src/app/model/response-api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-perfil',
  templateUrl: './cadastrar-perfil.component.html',
  styleUrls: ['./cadastrar-perfil.component.css']
})
export class CadastrarPerfilComponent implements OnInit {

  formGroup: FormGroup;
  perfil: PerfilDto;
  shared : SharedService;

  message: {};
  classCss: {};
  class = 'sucess';

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: PerfilService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {
    this.shared = SharedService.getInstance();
    this.createForm();
  }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
      if (!id){
        this.perfil = new PerfilDto();
        this.perfil.id = 0;
      } else {
        this.service.getPerfil(id).subscribe((responseApi: ResponseApi) => {
          var  dto  = responseApi['data'];
          this.perfil = new PerfilDto();
          this.perfil.id = dto.id;
          this.perfil.imagem =dto.imagem;
          this.perfil.nome =dto.nome;
          console.log(JSON.stringify(this.perfil));
        }, err => {
          this.showMessage({
            type: 'error',
            text: err['error']['errors'][0]
          });
        });
      }
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'nome': [null, Validators.required],
      'imagem': [null, Validators.required]
    });

  }

  save() {
    this.message = '';

    this.service.create(this.perfil).subscribe((responseApi: ResponseApi) => {
      this.perfil = responseApi['data'];
      this.openSnackBar('Operacao realizada com sucesso','OK');
    }, err => {
      console.log('erro de autenticação='+ JSON.stringify(err.status));
      this.class = 'error';
      if(err.status == '400')
      this.message = 'Ja existe um usuario com o login '+this.perfil.nome;
      else
        this.message = 'Erro: entre em contato com o suporte';
        console.log(this.message);
    });
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
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

}
