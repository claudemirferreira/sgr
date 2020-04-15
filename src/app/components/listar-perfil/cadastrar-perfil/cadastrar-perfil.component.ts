import { Component, OnInit } from '@angular/core';
import { PerfilDto } from 'src/app/model/perfil-dto';
import { SharedService } from 'src/app/services/shared.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseApi } from 'src/app/model/response-api';

@Component({
  selector: 'app-cadastrar-perfil',
  templateUrl: './cadastrar-perfil.component.html',
  styleUrls: ['./cadastrar-perfil.component.css']
})
export class CadastrarPerfilComponent implements OnInit {

  formGroup: FormGroup;
  perfil: PerfilDto;
  shared : SharedService;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: PerfilService,
    private formBuilder: FormBuilder) {
    this.shared = SharedService.getInstance();
  }

  
  ngOnInit() {
    this.createForm();
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
      if (!id){
        this.perfil = new PerfilDto();
        this.perfil.id = 0;
      } else {
        this.service.findById(id).subscribe((responseApi: ResponseApi) => {
          this.perfil = responseApi['data'];
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
      'acao': [null, Validators.required],
      'imagem': [null, Validators.required]
    });

  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
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
