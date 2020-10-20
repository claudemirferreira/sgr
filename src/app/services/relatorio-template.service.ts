import { Injectable, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AreaDto } from '../model/area-dto';
import { FiltroDto } from '../model/filtro-dto';
import { NucleoDto } from '../model/nucleo-dto';
import { ParamRelatorioDto } from '../model/param-relatorio-dto';
import { ResponseApi } from '../model/response-api';
import { ZonaDto } from '../model/zona-dto';
import { RelatorioService } from './relatorio.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioTemplateService implements OnInit {
  keyword = "nome";
  @ViewChild("pdfViewer")
  public pdfViewer;

  shared: SharedService;
  filtroDto: FiltroDto;
  anoInicio: number;
  anoFim: number;
  ano: number;

  zonas: [];
  anos: number[];

  constructor(
    protected router: Router,
    protected relatorioService: RelatorioService,
    protected ngxLoader: NgxUiLoaderService
  ) {
    this.shared = SharedService.getInstance();
  }

  getPerfil() {
    this.router.navigate(["/lista-rotina-perfil/" + this.shared.idPerfil]);
  }

  ngOnInit() {
    this.filtroDto = new FiltroDto();
    this.carregarDados();
  }

  gerarRelatorio(): void {
    this.ngxLoader.start();
    this.relatorioService.geraPdf(this.filtroDto).subscribe(
      (res) => {
        this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
        this.ngxLoader.stop();
      },
      (err) => {
        this.ngxLoader.stop();
      }
    );
  }

  print(nomeRelatorio: string): void {
    this.ngxLoader.start();
    this.filtroDto.nomeRelatorio = nomeRelatorio;
    this.relatorioService.geraPdf(this.filtroDto).subscribe(
      (res) => {
        this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
        this.ngxLoader.stop();
      },
      (err) => {
        this.ngxLoader.stop();
      }
    );
  }

  selectZona(zona: ZonaDto) {
    this.ngxLoader.start();
    if (zona.id > 0) {
      this.relatorioService.carregarNucleo(zona.id).subscribe(
        (responseApi: ResponseApi) => {
          this.filtroDto.nucleos = responseApi["data"];
          this.filtroDto.nucleo = new NucleoDto();
          if(this.filtroDto.nucleos.length == 1){
            this.filtroDto.nucleo = this.filtroDto.nucleos[0];
          }
          this.filtroDto.area.id = null;
          this.filtroDto.areas = [];
          this.ngxLoader.stop();
        },
        (err) => {
          this.ngxLoader.stop();
        }
      );
    }
  }

  selectNucleo(nucleo: NucleoDto) {
    this.ngxLoader.start();
    if (nucleo.id > 0) {
      this.relatorioService.carregarArea(nucleo.id).subscribe(
        (responseApi: ResponseApi) => {
          this.filtroDto.areas = responseApi["data"];
          this.filtroDto.area.id = null;
          this.ngxLoader.stop();

          this.filtroDto.zona = nucleo.zona;
        },
        (err) => {
          this.ngxLoader.stop();
        }
      );
    }
  }

  carregarDados() {
    this.ngxLoader.start();
    this.relatorioService.carregarDados().subscribe(
      (responseApi: ResponseApi) => {
        this.filtroDto = responseApi["data"];
        if (!this.shared.user.nucleo && this.shared.user.zona) {
          //this.filtroDto.nucleos.unshift(this.selecioneNucleo);
        }
        if (this.shared.user.zona) {
          //this.filtroDto.zonas.unshift(this.selecioneZona);
        }
        this.ngxLoader.stop();
      },
      (err) => {
        this.ngxLoader.stop();
      }
    );
  }

  selectArea(area: AreaDto) {
    if (area.id > 0) {
      this.filtroDto.area = area;
      this.filtroDto.nucleo = area.nucleo;
      this.filtroDto.zona = area.nucleo.zona;
      console.log("selectEvent");
    }
  }

  selectEvent(area: NucleoDto) {
    console.log("selectEvent");
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log("onChangeSearch");
  }

  onFocused(e) {
    // do something
    console.log("onChangeSearch");
  }

  onSearchChange($event) {
    alert(this.filtroDto.areas.length);
    $event.stopPropagation();
  }

}
