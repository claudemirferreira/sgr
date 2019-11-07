import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurrentUsuario } from './../../model/current-usuario';
import { SharedService } from './../../services/shared.service';
import { Usuario } from './../../model/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  user = new Usuario('','','','');
  shared : SharedService;
  message : string;  

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
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }  

  login(){
    this.message = '';
    this.userService.login(this.user).subscribe((userAuthentication:CurrentUsuario) => {
        this.shared.token = userAuthentication.token;
        this.shared.user = userAuthentication.user;
        this.shared.user.profile = this.shared.user.profile.substring(5);
        this.shared.showTemplate.emit(true);
        this.router.navigate(['/']);
    } , err => {
      this.shared.token = null;
      this.shared.user = null;
      this.shared.showTemplate.emit(false);
      this.message = 'Erro ';
    });
  }

  cancelLogin(){
    this.message = '';
    this.user = new Usuario('', '','','');
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