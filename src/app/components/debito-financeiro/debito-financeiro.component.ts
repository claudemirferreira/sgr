import { AreaDto } from 'src/app/model/area-dto';
import { NucleoDto } from './../../model/nucleo-dto';
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { FiltroDto } from "src/app/model/filtro-dto";
import { ParamRelatorioDto } from "src/app/model/param-relatorio-dto";
import { ResponseApi } from "src/app/model/response-api";
import { ZonaDto } from 'src/app/model/zona-dto';
import { RelatorioService } from "src/app/services/relatorio.service";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-debito-financeiro",
  templateUrl: "./debito-financeiro.component.html",
  styleUrls: ["./debito-financeiro.component.css"],
})
export class DebitoFinanceiroComponent implements OnInit {
  @ViewChild("pdfViewer")
  public pdfViewer;

  message: {};
  shared: SharedService;
  dto: ParamRelatorioDto;
  filtroDto: FiltroDto;
  ano: number;

  zonas: [];
  anos: number[];
  classCss: {};

  selecioneNucelo: NucleoDto = new NucleoDto();

  filterRegiao: ZonaDto = new ZonaDto();
  filterNucleo: NucleoDto = new NucleoDto();
  filterArea: AreaDto = new AreaDto();

  constructor(
    private router: Router,
    private relatorioService: RelatorioService,
    private ngxLoader: NgxUiLoaderService
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.filtroDto = new FiltroDto();
    this.selecioneNucelo.id = -1
    this.selecioneNucelo.nome = 'Selecione um nucleo';
    this.carregarDados();
  }

  getPerfil() {
    this.router.navigate(["/lista-rotina-perfil/" + this.shared.idPerfil]);
  }

  gerarRelatorio(): void {
    this.ngxLoader.start();
    this.filtroDto.nomeRelatorio = "RelatorioDebitoFinanceiro.jasper";
    this.relatorioService.geraPdf(this.filtroDto).subscribe(
      (res) => {
        this.pdfViewer.pdfSrc = res;
        this.pdfViewer.refresh();
        this.ngxLoader.stop();
        this.clearFilters();
      },
      (err) => {
        this.ngxLoader.stop();
        this.showMessage({
          type: "error",
          text: err["error"]["errors"][0],
        });
      }
    );
  }

  changeArea() {
    this.ngxLoader.start();
    console.log(this.filtroDto.nucleo.id)
    this.relatorioService.carregarArea(this.filtroDto.nucleo.id).subscribe(
      (responseApi: ResponseApi) => {
        this.filtroDto.areas = responseApi["data"];
        this.filtroDto.area.id = null;
        this.ngxLoader.stop();
        this.clearFilters();

        const area: AreaDto = this.filtroDto.areas.filter(a => a.nucleo.id == this.filtroDto.nucleo.id)[0];
        this.filtroDto.zona = area.nucleo.zona;
      }, (err) => {
        this.ngxLoader.stop();
        this.showMessage({
          type: "error",
          text: err["error"]["errors"][0],
        });
      }
    );
  }

  carregarNucleo() {
    this.ngxLoader.start();
    this.relatorioService
      .carregarNucleo(this.filtroDto.zona.id.toString())
      .subscribe(
        (responseApi: ResponseApi) => {
          this.filtroDto.nucleos = responseApi["data"];
          this.filtroDto.nucleo.id = null;
          this.filtroDto.area.id = null;
          this.filtroDto.areas = [];
          this.ngxLoader.stop();
          this.clearFilters();
        },
        (err) => {
          this.ngxLoader.stop();
          this.showMessage({
            type: "error",
            text: err["error"]["errors"][0],
          });
        }
      );
  }

  carregarDados() {
    this.ngxLoader.start();
    this.relatorioService.carregarDados().subscribe( (responseApi: ResponseApi) => {
        this.filtroDto = responseApi["data"];
        this.filtroDto.nucleos.unshift(this.selecioneNucelo);
        this.ngxLoader.stop();
      },
      (err) => {
        this.ngxLoader.stop();
        this.showMessage({
          type: "error",
          text: err["error"]["errors"][0],
        });
      }
    );
  }

  private showMessage(message: { type: string; text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      alert: true,
    };
    this.classCss["alert-" + type] = true;
  }

  selectEvent(item) {
    // do something with selected item
    console.log('selectEvent');
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    console.log('onChangeSearch');
  }

  onFocused(e) {
    // do something
    console.log('onChangeSearch');
  }

  onSearchChange($event) {
    $event.stopPropagation();
  }

  onChangeArea($event, area: AreaDto) {
    const fullArea:AreaDto = this.filtroDto.areas.filter(a => a.id == area.id)[0];
    this.filtroDto.nucleo = fullArea.nucleo;
    this.filtroDto.zona = fullArea.nucleo.zona;
  }

  clearFilters() {
    this.filterRegiao = new ZonaDto();
    this.filterNucleo = new NucleoDto();
    this.filterArea = new AreaDto();
  }

}
