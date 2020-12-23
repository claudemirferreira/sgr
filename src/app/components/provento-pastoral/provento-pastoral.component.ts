import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, OnInit, ViewChild } from "@angular/core";
import { FiltroDto } from "src/app/model/filtro-dto";
import { ZonaDto } from "src/app/model/zona-dto";
import { ResponseApi } from "src/app/model/response-api";
import { RelatorioService } from "src/app/services/relatorio.service";
import { ParamRelatorioDto } from "src/app/model/param-relatorio-dto";
import { SharedService } from "src/app/services/shared.service";
import { Router } from "@angular/router";
import { NucleoDto } from 'src/app/model/nucleo-dto';
import { AreaDto } from 'src/app/model/area-dto';
import { RelatorioTemplateService } from 'src/app/services/relatorio-template.service';

@Component({
  selector: "app-provento-pastoral",
  templateUrl: "./provento-pastoral.component.html",
  styleUrls: ["./provento-pastoral.component.css"],
})
export class ProventoPastoralComponent extends RelatorioTemplateService implements OnInit {

  @ViewChild("pdfViewer")
  public pdfViewer;

  constructor(
    protected router: Router,
    protected relatorioService: RelatorioService,
    protected ngxLoader: NgxUiLoaderService
  ) {
    super(router, relatorioService, ngxLoader);
    this.shared = SharedService.getInstance();
  }

  gerarRelatorio(): void {
    this.ngxLoader.start();
    super.print("RelatorioDemonstrativoProventos.jasper");
  }

}
