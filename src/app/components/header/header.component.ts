import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from './../../model/usuario';
import { Router } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlterarSenhaComponent } from '../list-usuario/alterar-senha/alterar-senha.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public shared: SharedService;

  constructor(private userService: UsuarioService,
              private dialog: MatDialog,
              private router: Router){
      this.shared = SharedService.getInstance();
      this.shared.user = new Usuario();
  }

  ngOnInit(){
  }

  signOut() : void {
    this.shared.token = null;
    this.shared.user = null;
    window.location.href = '/login';
    window.location.reload();
  }

  openDialogSenha(idUsuario: number){
    console.log('openDialogSenha');
    let dialogRef = this.dialog.open(AlterarSenhaComponent, { data: {idUsuario: idUsuario}})
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

}