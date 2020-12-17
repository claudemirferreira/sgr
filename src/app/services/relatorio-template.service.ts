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
  dto: FiltroDto;
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
    if(zona.id >= 0){
      this.filtroDto.nucleo.nome = '';
      this.ngxLoader.start();
        this.relatorioService.carregarNucleo(zona.id).subscribe(
          (responseApi: ResponseApi) => {
            
            this.dto = responseApi["data"];

            this.filtroDto.nucleos = this.dto.nucleos;
            this.filtroDto.nucleo.id = -1;
            this.filtroDto.nucleo.nome = '';
            if(this.filtroDto.nucleos.length == 1){
              this.filtroDto.nucleo = this.filtroDto.nucleos[0];
            }
            this.filtroDto.area.id = null;
            this.filtroDto.area.nome = '';
            this.filtroDto.areas = [];
            this.filtroDto.areas = this.dto.areas;
            this.ngxLoader.stop();
          },
          (err) => {
            this.ngxLoader.stop();
          }
        );
    }
  }

  selectNucleo(nucleo: NucleoDto) {
    if(nucleo.id >= 0){
      this.ngxLoader.start();
        this.relatorioService.carregarArea(nucleo.id).subscribe(
          (responseApi: ResponseApi) => {
            this.filtroDto.areas = responseApi["data"];
            this.filtroDto.area = new AreaDto();
            this.filtroDto.area.id = null;
            this.filtroDto.area.nome = '';

            if(this.filtroDto.areas.length == 1){
              this.filtroDto.area = this.filtroDto.areas[0];
            }
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
        this.checkValores();

        if(this.filtroDto.zonas.length < 2){
          try {
            document.getElementById('zona').remove();
          } catch (error) {

          }
        }
        if(this.filtroDto.zonas.length > 1){
          try {
            document.getElementById('zonaInput').remove();
          } catch (error) {

          }
        }
        if(this.filtroDto.nucleos.length < 2){
          try {
            document.getElementById('nucleo').remove();
          } catch (error) {

          }
        }
        if(this.filtroDto.nucleos.length > 1){
          try {
            document.getElementById('nucleoInput').remove();
          } catch (error) {

          }
        }

        if(this.filtroDto.zonas.length == 1){
          this.filtroDto.zona = this.filtroDto.zonas[0];
        }

        if(this.filtroDto.nucleos.length == 1){
          this.filtroDto.nucleo = this.filtroDto.nucleos[0];
          this.filtroDto.zona =  this.filtroDto.nucleo.zona;
        }
        if(this.filtroDto.areas.length == 1){
          this.filtroDto.area = this.filtroDto.areas[0];
          this.filtroDto.nucleo =  this.filtroDto.area.nucleo;
          this.filtroDto.zona =  this.filtroDto.nucleo.zona;
        }
        this.ngxLoader.stop();
      },
      (err) => {
        this.ngxLoader.stop();
      }
    );
  }

  private checkValores(){
    if (this.filtroDto.area.id == 0)
      this.filtroDto.area.id = null;
      this.filtroDto.area.nome = '';
    if (this.filtroDto.nucleo.id == 0)
      this.filtroDto.nucleo.id = null;
      this.filtroDto.nucleo.nome = '';
    if (this.filtroDto.zona.id == 0)
      this.filtroDto.zona.id = null;
      this.filtroDto.zona.nome = '';

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
  }

  onFocused(e) {
  }

  onSearchChange($event) {
    $event.stopPropagation();
  }

  zonaCleared() {
    this.carregarDados();
  }

  nucleoCleared() {
    this.selectZona(this.filtroDto.zona);
  }

  areaCleared() {
  }

}
