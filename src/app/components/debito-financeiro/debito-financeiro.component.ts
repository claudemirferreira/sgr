import { NgxUiLoaderService } from "ngx-ui-loader";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ResponseApi } from "src/app/model/response-api";
import { FiltroDto } from "src/app/model/filtro-dto";
import { HttpClient } from "@angular/common/http";
import { RelatorioService } from "src/app/services/relatorio.service";
import { ParamRelatorioDto } from "src/app/model/param-relatorio-dto";
import { SharedService } from "src/app/services/shared.service";
import { Router } from "@angular/router";
import { ZonaDto } from 'src/app/model/zona-dto';
import { NucleoDto } from 'src/app/model/nucleo-dto';
import { AreaDto } from 'src/app/model/area-dto';

@Component({
  selector: "app-debito-financeiro",
  templateUrl: "./debito-financeiro.component.html",
  styleUrls: ["./debito-financeiro.component.css"],
})
export class DebitoFinanceiroComponent implements OnInit {
  @ViewChild("pdfViewer")
  public pdfViewer;

  @ViewChild('mydiv', { static: false })
  public mydiv: ZonaDto;

  message: {};
  shared: SharedService;
  dto: ParamRelatorioDto;
  filtroDto: FiltroDto;
  ano: number;

  zonas: [];
  anos: number[];
  classCss: {};

  keyword = 'nome';
  public countries = [
    {
      id: 1,
      name: 'Albania',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    }
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private relatorioService: RelatorioService,
    private ngxLoader: NgxUiLoaderService
  ) {
    this.shared = SharedService.getInstance();
    this.mydiv = new ZonaDto();
    this.mydiv.id = 1;
    this.mydiv.nome = 'Claudemir';

  }

  getPerfil() {
    this.router.navigate(["/lista-rotina-perfil/" + this.shared.idPerfil]);
  }

  gerarRelatorio(): void {
    this.ngxLoader.start();
    this.filtroDto.nomeRelatorio = "RelatorioDebitoFinanceiro.jasper";
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
        console.log("Areas = " + this.filtroDto.areas);
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

  ngOnInit() {
    this.filtroDto = new FiltroDto();
    this.carregarDados();
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
    this.relatorioService.carregarDados().subscribe(
      (responseApi: ResponseApi) => {
        this.filtroDto = responseApi["data"];
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


}
