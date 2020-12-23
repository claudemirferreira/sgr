import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResponseApi } from './../../../model/response-api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './../../../services/shared.service';
import { RotinaService } from './../../../services/rotina.service';
import { Rotina } from './../../../model/rotina';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-rotina',
  templateUrl: './cadastrar-rotina.component.html',
  styleUrls: ['./cadastrar-rotina.component.css']
})
export class CadastrarRotinaComponent implements OnInit {


  formGroup: FormGroup;
  rotina: Rotina;
  shared : SharedService;

  message: {};
  classCss: {};
  class = 'sucess';

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: RotinaService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) {
    this.shared = SharedService.getInstance();
    this.createForm();
  }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
      if (!id){
        this.rotina = new Rotina();
        this.rotina.id = 0;
      } else {
        this.service.findById(id).subscribe((responseApi: ResponseApi) => {
          var  dto  = responseApi['data'];
          this.rotina = new Rotina();
          this.rotina.id = dto.id;
          this.rotina.imagem =dto.imagem;
          this.rotina.nome =dto.nome;
          console.log(JSON.stringify(this.rotina));
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

    this.service.createOrUpdate(this.rotina).subscribe((responseApi: ResponseApi) => {
      this.rotina = responseApi['data'];
      this.openSnackBar('Operacao realizada com sucesso','OK');
    }, err => {
      console.log('erro de autenticação='+ JSON.stringify(err.status));
      this.class = 'error';
      if(err.status == '400')
      this.message = 'Ja existe um usuario com o login '+this.rotina.nome;
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
