import { Component, OnInit, ViewChild } from '@angular/core';
import { MembroService } from 'src/app/services/membro.service';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';
import { ParamRelatorioDto } from 'src/app/model/param-relatorio-dto';
import { FiltroDto } from 'src/app/model/filtro-dto';
import { RelatorioService } from 'src/app/services/relatorio.service';
import { ResponseApi } from 'src/app/model/response-api';
import { ZonaDto } from 'src/app/model/zona-dto';
import { Membro } from 'src/app/model/membro';

@Component({
  selector: 'app-membro',
  templateUrl: './membro.component.html',
  styleUrls: ['./membro.component.css']
})
export class MembroComponent implements OnInit {

  @ViewChild('pdfViewer', { static: false }) 
  public pdfViewer;

  message: {};
  shared: SharedService;
  dto: ParamRelatorioDto;
  filtroDto: FiltroDto;
  membros: Membro[];

  zonas: [];
  anos: number[];
  classCss: {};
  valido = false;

  constructor(private http: HttpClient,
    private service: MembroService,
    private relatorioService: RelatorioService) { 
      this.carregarDados();
    }

    gerarRelatorio() {
      this.filtroDto.nomeRelatorio = 'RelatorioDebitoSecretaria.jasper'; 
      this.relatorioService.geraPdf(this.filtroDto).subscribe((res) => {
        this.pdfViewer.pdfSrc = res;
        this.pdfViewer.refresh();
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
    
    ngOnInit() {
      this.filtroDto = new FiltroDto();
      this.filtroDto.zona = new ZonaDto();
      this.filtroDto.zona.id = 0;
    }

    pesquisar() {
      this.service.find(this.filtroDto).subscribe((responseApi: ResponseApi) => {
        this.membros = responseApi['data'];
      }, err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
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
      console.log(JSON.stringify(this.filtroDto));
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