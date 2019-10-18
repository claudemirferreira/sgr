import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const appRoutes: Routes = [
  { path: 'relatorio', component: RelatorioComponent },
  { path: 'usuario',      component: UsuarioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RelatorioComponent,
    UsuarioComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxExtendedPdfViewerModule,
    PdfJsViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
