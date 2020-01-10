import { Component, OnInit, ViewChild } from '@angular/core';
import { ResponseApi } from 'src/app/model/response-api';
import { ZonaDto } from 'src/app/model/zona-dto';
import { FiltroDto } from 'src/app/model/filtro-dto';
import { HttpClient } from '@angular/common/http';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { SharedService } from 'src/app/services/shared.service';
import { ParamRelatorioDto } from 'src/app/model/param-relatorio-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estatistico',
  templateUrl: './estatistico.component.html',
  styleUrls: ['./estatistico.component.css']
})
export class EstatisticoComponent implements OnInit {

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

  constructor(private http: HttpClient,
    private router: Router,
    private relatorioService: RelatorioService) {      
      this.shared = SharedService.getInstance();
      this.carregarDados();
  }

  getPerfil(){
    this.router.navigate(['/lista-rotina-perfil/'+this.shared.idPerfil]);
  }

  gerarRelatorio() {
    this.filtroDto.nomeRelatorio = 'RelatorioEstatistico.jasper'; 
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