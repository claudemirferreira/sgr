import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ZonaDto } from "./../../model/zona-dto";
import { ResponseApi } from "./../../model/response-api";
import { RelatorioService } from "./../../services/relatorio.service";
import { HttpClient } from "@angular/common/http";
import { FiltroDto } from "./../../model/filtro-dto";
import { ParamRelatorioDto } from "./../../model/param-relatorio-dto";
import { SharedService } from "./../../services/shared.service";
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { Router } from "@angular/router";
import { NucleoDto } from 'src/app/model/nucleo-dto';
import { AreaDto } from 'src/app/model/area-dto';

@Component({
  selector: "app-debito-secretaria",
  templateUrl: "./debito-secretaria.component.html",
  styleUrls: ["./debito-secretaria.component.css"],
})
export class DebitoSecretariaComponent implements OnInit {

  @ViewChild("pdfViewer")
  public pdfViewer;

  message: {};
  shared: SharedService;
  dto: ParamRelatorioDto;
  filtroDto: FiltroDto;
  ano: number;

  selecioneNucleo: NucleoDto = new NucleoDto();
  selecioneZona: ZonaDto = new ZonaDto();

  filterRegiao: ZonaDto = new ZonaDto();
  filterNucleo: NucleoDto = new NucleoDto();
  filterArea: AreaDto = new AreaDto();

  zonas: [];
  anos: number[];
  classCss: {};
  @Output()
  select: EventEmitter<any>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private relatorioService: RelatorioService,
    private ngxLoader: NgxUiLoaderService
  ) {
    this.shared = SharedService.getInstance();
  }

  getPerfil() {
    this.router.navigate(["/lista-rotina-perfil/" + this.shared.idPerfil]);
  }


  ngOnInit() {
    this.filtroDto = new FiltroDto();
    this.selecioneNucleo.id = -1
    this.selecioneNucleo.nome = 'Selecione um item';

    this.selecioneZona.id = -1
    this.selecioneZona.nome = 'Selecione um item';


    this.carregarDados();
  }

  gerarRelatorio(): void {
    this.ngxLoader.start();
    this.filtroDto.nomeRelatorio = "RelatorioDebitoSecretaria.jasper";
    this.relatorioService.geraPdf(this.filtroDto).subscribe(
      (res) => {
        this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
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
  changeArea() {
    this.ngxLoader.start();
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
        if (!this.shared.user.nucleo && this.shared.user.zona) {
          this.filtroDto.nucleos.unshift(this.selecioneNucleo);
        }
        if (this.shared.user.zona) {
          this.filtroDto.zonas.unshift(this.selecioneZona);
        }
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
