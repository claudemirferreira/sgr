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
  MatPaginatorModule,
  MatCardModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { DebitoFinaceiroComponent } from './components/debito-finaceiro/debito-finaceiro.component';
import { BalanceteAnaliticoComponent } from './components/balancete-analitico/balancete-analitico.component';
import { BalanceteSinteticoComponent } from './components/balancete-sintetico/balancete-sintetico.component';
import { CentroCustoComponent } from './components/centro-custo/centro-custo.component';
import { DebitoPastoralComponent } from './components/debito-pastoral/debito-pastoral.component';
import { DebitoSecretariaComponent } from './components/debito-secretaria/debito-secretaria.component';
import { EstatisticoComponent } from './components/estatistico/estatistico.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RotinaComponent } from './components/rotina/rotina.component';

const appRoutes: Routes = [
  { path: 'rotina', component: RotinaComponent, canActivate: [AuthGuard] },
  { path: 'rotina/:idPerfil', component: RotinaComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'debito-secretaria', component: DebitoSecretariaComponent, canActivate: [AuthGuard] },
  { path: 'debito-pastoral', component: DebitoPastoralComponent, canActivate: [AuthGuard] },
  { path: 'debito-financeiro', component: DebitoFinaceiroComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: UsuarioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LoginComponent,
    DebitoFinaceiroComponent,
    BalanceteAnaliticoComponent,
    BalanceteSinteticoComponent,
    CentroCustoComponent,
    DebitoPastoralComponent,
    DebitoSecretariaComponent,
    EstatisticoComponent,
    PerfilComponent,
    RotinaComponent
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
