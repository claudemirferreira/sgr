import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ZonaDto } from './../../model/zona-dto';
import { ResponseApi } from './../../model/response-api';
import { RelatorioService } from './../../services/relatorio.service';
import { HttpClient } from '@angular/common/http';
import { FiltroDto } from './../../model/filtro-dto';
import { ParamRelatorioDto } from './../../model/param-relatorio-dto';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debito-pastoral',
  templateUrl: './debito-pastoral.component.html',
  styleUrls: ['./debito-pastoral.component.css']
})
export class DebitoPastoralComponent implements OnInit {

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
    private router: Router,
    private relatorioService: RelatorioService, private fb: FormBuilder) {      
      this.shared = SharedService.getInstance();
      this.carregarDados();
  }

  getPerfil(){
    this.router.navigate(['/lista-rotina-perfil/'+this.shared.idPerfil]);
  }

  gerarRelatorio() {
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
      console.log("Areas = " + this.filtroDto.areas);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  validateZona(){
    if (this.filtroDto.area == null || this.filtroDto.area.id > 0){
      return false;
    } else {
      return true;
    }
  }

  validarArea(){
    if (this.filtroDto.area != null && this.filtroDto.area.id > 0){
      this.valido = true;
      console.log(this.valido);
    } else {      
      this.valido = false;
      console.log(this.valido);
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
      //this.filtroDto.zona = new ZonaDto();
      console.log('this.filtroDto.zonas.length'+ this.filtroDto.zonas.length);
           

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