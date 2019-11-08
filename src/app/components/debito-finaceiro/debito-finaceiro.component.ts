import { ZonaDto } from './../../model/zona-dto';
import { FiltroDto } from './../../model/filtro-dto';
import { ParamRelatorioDto } from './../../model/param-relatorio-dto';
import { SharedService } from './../../services/shared.service';
import { RelatorioService } from './../../services/relatorio.service';
import { HttpClient } from '@angular/common/http';
import { ResponseApi } from './../../model/response-api';
import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-debito-finaceiro',
  templateUrl: './debito-finaceiro.component.html',
  styleUrls: ['./debito-finaceiro.component.css']
})
export class DebitoFinaceiroComponent implements OnInit {

  @ViewChild('pdfViewer', { static: false }) 
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
  valido = false;

  @Output()
  select: EventEmitter<any>;

  constructor(private http: HttpClient,
    private relatorioService: RelatorioService) {
    this.carregarDados();
  }

  gerarRelatorio() {
    this.filtroDto.nomeRelatorio = 'RelatorioDebitoFinanceiro.jasper'; 
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
      console.log("Areas = " + this.filtroDto.areas);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  validateZona(){
    if (this.filtroDto.zona == null || this.filtroDto.zona.id > 0){
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.filtroDto = new FiltroDto();
    this.filtroDto.zona = new ZonaDto();
    this.filtroDto.zona.id = 0;
    this.filtroDto.nomeRelatorio = 'RelatorioDebitoFinanceiro.jasper';    
  }

  carregarNucleo() {
    this.relatorioService.carregarNucleo(this.filtroDto.zona.id.toString()).subscribe((responseApi: ResponseApi) => {
      this.filtroDto.nucleos = responseApi['data'];
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
      //this.paramentroRelatorioDto.zonas = responseApi['zonas'];
      this.filtroDto.zona = new ZonaDto();
      this.filtroDto.zona.id = 0;
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