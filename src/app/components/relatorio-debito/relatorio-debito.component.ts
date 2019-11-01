import { ParamentroRelatorioDto } from './../../model/paramentro-relatorio-dto';
import { AreaDto } from './../../model/area-dto';
import { NucleoDto } from './../../model/nucleo-dto';
import { ResponseApi } from './../../model/response-api';
import { RelatorioService } from './../../services/relatorio.service';
import { ZonaDto } from './../../model/zona-dto';
import { ParamRelatorioDto } from './../../model/param-relatorio-dto';
import { SharedService } from './../../services/shared.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-relatorio-debito',
  templateUrl: './relatorio-debito.component.html',
  styleUrls: ['./relatorio-debito.component.css']
})
export class RelatorioDebitoComponent implements OnInit {

  @ViewChild('pdfViewer', { static: false }) public pdfViewer;
  message: {};
  shared: SharedService;
  dto: ParamRelatorioDto;
  paramentroRelatorioDto: ParamentroRelatorioDto;

  zona = new ZonaDto('', '');
  nucleo = new NucleoDto('', '');
  area = new AreaDto('', '');
  ano: number;

  zonas: [];
  nucleos: [];
  areas: [];
  anos: [];
  classCss: {};

  @Output()
  select: EventEmitter<any>;

  constructor(private http: HttpClient,
    private relatorioService: RelatorioService) {
    this.carregarDados();
  }

  gerarRelatorio() {
    this.paramentroRelatorioDto = new ParamentroRelatorioDto(
      'RelatorioDebitoFinanceiro.jasper',
      this.zona.idZona,
      this.nucleo.id,
      this.area.id,
      this.ano
    );

    this.relatorioService.geraPdf(this.paramentroRelatorioDto).subscribe((res) => {
      this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
      this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  changeZona($event: EventEmitter<MatSelectChange>) {
    console.log('zona selecionada = ' + this.zona.idZona);
    this.carregarNucleo();
  }

  changeArea($event: EventEmitter<MatSelectChange>) {
    console.log('nucleo selecionada = ' + this.nucleo.id);
    this.carregarArea(this.nucleo.id);
    //this.select. emit($event);
  }

  ngOnInit() {
  }

  carregarNucleo() {
    this.relatorioService.carregarNucleo(this.zona.idZona).subscribe((responseApi: ResponseApi) => {
      this.nucleos = responseApi['data'];
      this.areas = [];
      console.log(this.nucleos);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  carregarArea(idNucleo: string) {
    console.log("carregarArea = " + idNucleo);
    this.relatorioService.carregarArea(idNucleo).subscribe((responseApi: ResponseApi) => {
      this.areas = responseApi['data'];
      console.log("Areas = " + this.areas);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  carregarDados() {
    this.relatorioService.carregarDados().subscribe((responseApi: ResponseApi) => {
      this.dto = responseApi['data'];
      this.zonas = this.dto.zonas;
      this.nucleos = this.dto.nucleos;
      this.anos = this.dto.anos;
      this.ano = this.anos[0];
      console.log(this.anos);
      console.log(this.dto.zonas);
      console.log(this.dto.nucleos);
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