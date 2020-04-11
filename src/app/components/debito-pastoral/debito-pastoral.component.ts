import { ZonaDto } from './../../model/zona-dto';
import { ResponseApi } from './../../model/response-api';
import { RelatorioService } from './../../services/relatorio.service';
import { HttpClient } from '@angular/common/http';
import { FiltroDto } from './../../model/filtro-dto';
import { ParamRelatorioDto } from './../../model/param-relatorio-dto';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressButtonOptions } from 'mat-progress-buttons';

@Component({
  selector: 'app-debito-pastoral',
  templateUrl: './debito-pastoral.component.html',
  styleUrls: ['./debito-pastoral.component.css']
})
export class DebitoPastoralComponent implements OnInit {

  spinnerButtonOptions: MatProgressButtonOptions = {
    active: false,
    text: 'Imprimir',
    spinnerSize: 18,
    raised: true,
    stroked: false,
    spinnerColor: 'warn',
    fullWidth: false,
    disabled: false,
    mode: 'indeterminate',
    buttonIcon: {
      fontIcon: 'print'
    }
  }

  @ViewChild('pdfViewer')
  public pdfViewer;

  message: {};
  shared: SharedService;
  dto: ParamRelatorioDto;
  filtroDto: FiltroDto;
  anoInicio: number;
  anoFim: number;
  ano: number;

  zonas: [];
  anos: number[];
  classCss: {};

  constructor(private http: HttpClient,
    private router: Router,
    private relatorioService: RelatorioService) {
    this.shared = SharedService.getInstance();
    this.ngOnInit();
  }

  getPerfil() {
    this.router.navigate(['/lista-rotina-perfil/' + this.shared.idPerfil]);
  }

  gerarRelatorio(): void {
    this.spinnerButtonOptions.active = true;
    setTimeout(() => {
      this.filtroDto.nomeRelatorio = 'RelatorioDebitoPastoral.jasper';
      this.relatorioService.geraPdf(this.filtroDto).subscribe((res) => {
        this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
      }, err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
      this.spinnerButtonOptions.active = false;
    }, 4000);
  }

  gerarRelatorio1() {
    this.filtroDto.nomeRelatorio = 'RelatorioDebitoPastoral.jasper';
    this.relatorioService.geraPdf(this.filtroDto).subscribe((res) => {
      this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
      this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  changeArea() {
    this.relatorioService.carregarArea(this.filtroDto.nucleo.id).subscribe((responseApi: ResponseApi) => {
      this.filtroDto.areas = responseApi['data'];
      this.filtroDto.area.id = null;
      console.log("Areas = " + this.filtroDto.areas);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  ngOnInit() {
    this.filtroDto = new FiltroDto();
    this.filtroDto.zona = new ZonaDto();
    this.filtroDto.zona.id = -1;

    this.carregarDados();
  }

  carregarNucleo() {
    this.relatorioService.carregarNucleo(this.filtroDto.zona.id.toString()).subscribe((responseApi: ResponseApi) => {
      this.filtroDto.nucleos = responseApi['data'];
      this.filtroDto.nucleo.id = null;
      this.filtroDto.area.id = null;
      this.filtroDto.areas = [];
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  carregarDados() {
    this.relatorioService.carregarDados().subscribe((responseApi: ResponseApi) => {
      this.filtroDto = responseApi['data'];
      this.filtroDto.zona = new ZonaDto();
      this.filtroDto.zona.id = -1;
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
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