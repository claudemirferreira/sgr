import { CurrentUsuario } from './../../../model/current-usuario';
import { Erro } from './../../../model/erro';
import { Router } from '@angular/router';
import { UsuarioService } from './../../../services/usuario.service';
import { SharedService } from './../../../services/shared.service';
import { Usuario } from './../../../model/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html',
  styleUrls: ['./usuario-detalhe.component.css']
})
export class UsuarioDetalheComponent implements OnInit {  

  formGroup: FormGroup;
  user = new Usuario();
  shared : SharedService;
  @Input() message: string | null;
  erro: Erro;

  constructor(private userService: UsuarioService,
              private router: Router,
              private formBuilder: FormBuilder) { 
    this.shared = SharedService.getInstance();
    
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {    
    this.formGroup = this.formBuilder.group({
      'nome': [null, Validators.required],
      'login': [null, Validators.required]
    });
  }  

  login(){
    this.message = null;
    this.userService.login(this.user).subscribe((userAuthentication:CurrentUsuario) => {
        this.shared.token = userAuthentication.token;
        console.log('this.shared.token='+this.shared.token);
        this.shared.user = userAuthentication.user;
        this.shared.user.profile = this.shared.user.profile.substring(5);
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

}
