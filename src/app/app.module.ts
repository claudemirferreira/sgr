import { UsuarioDetalheComponent } from './components/list-usuario/usuario-detalhe/usuario-detalhe.component';
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

import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatTabsModule,
  MatPaginatorModule,
  MatCardModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { DebitoPastoralComponent } from './components/debito-pastoral/debito-pastoral.component';
import { DebitoSecretariaComponent } from './components/debito-secretaria/debito-secretaria.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DebitoFinanceiroComponent } from './components/debito-financeiro/debito-financeiro.component';
import { MembroComponent } from './components/membro/membro.component';
import { RelatorioMembroComponent } from './components/relatorio-membro/relatorio-membro.component';
import { ProventoPastoralComponent } from './components/provento-pastoral/provento-pastoral.component';
import { SaldoCongregacaoComponent } from './components/saldo-congregacao/saldo-congregacao.component';
import { ListaRotinaPerfilComponent } from './components/lista-rotina-perfil/lista-rotina-perfil.component';
import { ListarPerfilComponent } from './components/listar-perfil/listar-perfil.component';
import { AssociarRotinaComponent } from './components/listar-perfil/associar-rotina/associar-rotina.component';
import { MembroDetalheComponent } from './components/relatorio-membro/membro-detalhe/membro-detalhe.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { ListUsuarioComponent } from './components/list-usuario/list-usuario.component';
import { ListRotinaComponent } from './components/list-rotina/list-rotina.component';

const appRoutes: Routes = [
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },  
  { path: 'list-perfil', component: ListarPerfilComponent, canActivate: [AuthGuard] },  
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
  { path: 'login', component: LoginComponent },
  //usuario
  { path: 'list-usuario', component: ListUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'novo-usuario', component: UsuarioDetalheComponent, canActivate: [AuthGuard] },
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
    MembroComponent,
    RelatorioMembroComponent,
    ProventoPastoralComponent,
    SaldoCongregacaoComponent,
    ListaRotinaPerfilComponent,
    ListarPerfilComponent,
    AssociarRotinaComponent,
    MembroDetalheComponent,
    CardComponent,
    HeaderComponent,
    ListUsuarioComponent,
    UsuarioDetalheComponent,
    ListRotinaComponent
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
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    PdfJsViewerModule,
    MatCardModule,
    ReactiveFormsModule
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
    MatCardModule
  ],
})
export class AppModule { }
