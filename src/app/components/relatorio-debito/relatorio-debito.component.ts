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
  
  zona = new ZonaDto('','');  
  nucleo = new NucleoDto('','');  
  area = new AreaDto('','');

  zonas: [];
  nucleos: [];
  areas: [];
  classCss: {};
  url = "http://localhost:8080/api/relatorio/downloadPDF";

  @Output()  select: EventEmitter<any>;

  constructor(private http: HttpClient,
              private relatorioService: RelatorioService) {
    this.download();
    this.carregarDados();
  }

  download(){
    this.downloadFile(this.url).subscribe(
      (res) => {
        this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
      }
    );
  }

  changeZona($event: EventEmitter<MatSelectChange>) {
    console.log('zona selecionada = ' + this.zona.idZona);
    console.log('oiiiii' + $event);
    this.carregarNucleo();
    //this.select. emit($event);
  }

  changeArea($event: EventEmitter<MatSelectChange>) {
    console.log('zona selecionada = ' + this.zona.idZona);
    console.log('oiiiii' + $event);
    this.carregarNucleo();
    //this.select. emit($event);
  }

  private downloadFile(url: string): any {
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  ngOnInit() {
  }

  carregarNucleo(){
    this.relatorioService.carregarNucleo(this.zona.idZona).subscribe((responseApi:ResponseApi) => {        
        this.dto = responseApi['data'];
        this.nucleos = responseApi['data'];
        console.log(this.dto);
        console.log(this.dto.nucleos);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }  

  carregarArea(){
    this.relatorioService.carregarNucleo(this.zona.idZona).subscribe((responseApi:ResponseApi) => {        
        this.dto = responseApi['data'];
        this.nucleos = responseApi['data'];
        console.log(this.dto);
        console.log(this.dto.nucleos);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }  

  carregarDados(){
    this.relatorioService.carregarDados().subscribe((responseApi:ResponseApi) => {        
        this.dto = responseApi['data'];
        this.zonas = this.dto.zonas;
        this.nucleos = this.dto.nucleos;
        console.log(this.dto);
        console.log(this.dto.zonas);
        console.log(this.dto.nucleos);
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }  

  private showMessage(message: {type: string, text: string}): void {
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
    this.classCss['alert-'+type] =  true;
  }

}