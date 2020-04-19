import { CadastrarRotinaComponent } from './components/list-rotina/cadastrar-rotina/cadastrar-rotina.component';
import { AlterarSenhaComponent } from './components/list-usuario/alterar-senha/alterar-senha.component';
import { CadastrarPerfilComponent } from './components/listar-perfil/cadastrar-perfil/cadastrar-perfil.component';
import { CadastroUsuarioComponent } from './components/list-usuario/cadastro-usuario/cadastro-usuario.component';
import { AuthGuard } from './components/login/auth.guard';
import { AuthInterceptor } from './components/login/auth.interceptor';
import { UsuarioService } from './services/usuario.service';
import { SharedService } from './services/shared.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { DebitoPastoralComponent } from './components/debito-pastoral/debito-pastoral.component';
import { DebitoSecretariaComponent } from './components/debito-secretaria/debito-secretaria.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DebitoFinanceiroComponent } from './components/debito-financeiro/debito-financeiro.component';
import { RelatorioMembroComponent } from './components/relatorio-membro/relatorio-membro.component';
import { ProventoPastoralComponent } from './components/provento-pastoral/provento-pastoral.component';
import { SaldoCongregacaoComponent } from './components/saldo-congregacao/saldo-congregacao.component';
import { ListaRotinaPerfilComponent } from './components/lista-rotina-perfil/lista-rotina-perfil.component';
import { ListarPerfilComponent } from './components/listar-perfil/listar-perfil.component';
import { AssociarRotinaComponent } from './components/listar-perfil/associar-rotina/associar-rotina.component';
import { MembroDetalheComponent } from './components/relatorio-membro/membro-detalhe/membro-detalhe.component';
import { HeaderComponent } from './components/header/header.component';
import { ListUsuarioComponent } from './components/list-usuario/list-usuario.component';
import { ListRotinaComponent } from './components/list-rotina/list-rotina.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressButtonsModule } from 'mat-progress-buttons';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AssociacaoUsuarioComponent } from './components/list-usuario/associacao-usuario/associacao-usuario.component';
import { AssociacaoPerfilComponent } from './components/list-usuario/associacao-perfil/associacao-perfil.component';
import { LogComponent } from './components/log/log.component';
import { MatNativeDateModule } from '@angular/material/core';

const appRoutes: Routes = [
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'list-perfil', component: ListarPerfilComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-perfil', component: CadastrarPerfilComponent, canActivate: [AuthGuard] },
  { path: 'edit-perfil/:id', component: CadastrarPerfilComponent, canActivate: [AuthGuard] },

  { path: 'lista-rotina-perfil/:id', component: ListaRotinaPerfilComponent, canActivate: [AuthGuard] },
  { path: 'associar-rotina/:id', component: AssociarRotinaComponent, canActivate: [AuthGuard] },

  { path: 'debito-secretaria', component: DebitoSecretariaComponent, canActivate: [AuthGuard] },
  { path: 'debito-pastoral', component: DebitoPastoralComponent, canActivate: [AuthGuard] },
  { path: 'debito-financeiro', component: DebitoFinanceiroComponent, canActivate: [AuthGuard] },
  { path: 'provento-pastoral', component: ProventoPastoralComponent, canActivate: [AuthGuard] },
  { path: 'saldo-congregacao', component: SaldoCongregacaoComponent, canActivate: [AuthGuard] },
  { path: 'membro', component: RelatorioMembroComponent, canActivate: [AuthGuard] },
  { path: 'membro-detalhe/:idMembro', component: MembroDetalheComponent, canActivate: [AuthGuard] },

  { path: 'list-rotina', component: ListRotinaComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-rotina', component: CadastrarRotinaComponent, canActivate: [AuthGuard] },
  { path: 'editar-rotina/:id', component: CadastrarRotinaComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },


  { path: 'log', component: LogComponent },

  { path: 'list-usuario', component: ListUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'edit-usuario/:id', component: CadastroUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'usuario', component: UsuarioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LoginComponent,
    DebitoPastoralComponent,
    DebitoSecretariaComponent,
    PerfilComponent,
    DebitoFinanceiroComponent,
    RelatorioMembroComponent,
    ProventoPastoralComponent,
    SaldoCongregacaoComponent,
    ListaRotinaPerfilComponent,
    ListarPerfilComponent,
    CadastrarPerfilComponent,
    AssociarRotinaComponent,
    MembroDetalheComponent,
    HeaderComponent,
    ListUsuarioComponent,
    CadastroUsuarioComponent,
    ListRotinaComponent,
    AssociacaoUsuarioComponent,
    AssociacaoPerfilComponent,
    AlterarSenhaComponent,
    CadastrarRotinaComponent,
    LogComponent

  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    MatTabsModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    PdfJsViewerModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressButtonsModule,
    MatSnackBarModule,
    MatNativeDateModule
  ],
  providers: [UsuarioService,
    SharedService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    PdfJsViewerModule,
    MatCardModule,
    MatSnackBarModule,
    MatNativeDateModule
  ],
})
export class AppModule { }
