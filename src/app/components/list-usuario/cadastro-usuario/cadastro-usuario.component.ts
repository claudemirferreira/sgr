import { HttpClient } from '@angular/common/http';
import { ResponseApi } from './../../../model/response-api';
import { Erro } from './../../../model/erro';
import { UsuarioService } from './../../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../services/shared.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CurrentUsuario } from './../../../model/current-usuario';
import { Usuario } from 'src/app/model/usuario';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  formGroup: FormGroup;
  user = new Usuario();
  shared : SharedService;
  erro: Erro;

  message: {};  
  classCss: {};

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: UsuarioService,
    private formBuilder: FormBuilder) { 
      this.shared = SharedService.getInstance();
    }


  ngOnInit() {
    this.createForm();
    var id = this.route.params.subscribe(params => {
      var id = params['id'];
      console.log('id =====================' + id);
      if (!id)
        return;
      this.service.findById(id).subscribe((responseApi: ResponseApi) => {
        this.user = responseApi['data'];
        console.log(JSON.stringify(this.user));
      }, err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
    });
  }

  //ngOnInit() {   this.createForm();  }

  createForm() {    
    this.formGroup = this.formBuilder.group({
      'nome': [null, Validators.required],
      'login': [null, Validators.required],
      'senha': [null, Validators.required]
    });
  }  

  login(){
    this.message = null;
    this.service.login(this.user).subscribe((userAuthentication:CurrentUsuario) => {
        this.shared.token = userAuthentication.token;
        console.log('this.shared.token='+this.shared.token);
        this.shared.user = userAuthentication.user;
        this.shared.showTemplate.emit(true);
        this.router.navigate(['/perfil']);
    } , err => {
      console.log('erro de autenticação='+ JSON.stringify(err.status));
      this.erro =  err.status;
      console.log(this.erro.status);
      if(err.status == '401')
        this.message = 'Login e senha invalidos';
      else
        this.message = 'Erro: entre em contato com admin';
      this.shared.token = null;
      this.shared.user = null;
      this.shared.showTemplate.emit(false);
      console.log(this.message);
    });
  }

  cancelLogin(){
    this.message = '';
    this.user = new Usuario();
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
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