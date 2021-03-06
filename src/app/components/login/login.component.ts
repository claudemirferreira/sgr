import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CurrentUsuario } from './../../model/current-usuario';
import { SharedService } from './../../services/shared.service';
import { Autentication } from './../../model/autentication';
import { UsuarioService } from './../../services/usuario.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Erro } from 'src/app/model/erro';
import { MatProgressButtonOptions } from 'mat-progress-buttons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Entrar',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    buttonColor: 'primary',
    spinnerColor: 'warn',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon: 'input'
    }
  }

  loginForm: FormGroup;

  user = new Autentication();
  shared : SharedService;
  @Input() message: string | null;
  erro: Erro;

  constructor(private userService: UsuarioService,
              private router: Router,
              private ngxLoader: NgxUiLoaderService) {
    this.shared = SharedService.getInstance();
    this.shared.token = null;
    this.shared.user = null;
    this.shared.showTemplate.emit(false);
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login(): void {
    this.ngxLoader.start();
    this.spinnerButtonOptions.active = true;
    setTimeout(() => {
      this.message = null;
      this.userService.login(this.user).subscribe((userAuthentication:CurrentUsuario) => {
        this.shared.token = userAuthentication.token;
        console.log('this.shared.token='+this.shared.token);
        this.shared.user = userAuthentication.user;
        this.shared.showTemplate.emit(true);
        this.ngxLoader.stop();
        this.router.navigate(['/perfil']);
    } , err => {
      this.ngxLoader.stop();
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
      this.spinnerButtonOptions.active = false;
    }, 3350);
  }

  cancelLogin(){
    this.message = '';
    this.user = new Autentication();
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
