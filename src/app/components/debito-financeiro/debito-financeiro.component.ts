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
import { RelatorioTemplateService } from 'src/app/services/relatorio-template.service';

@Component({
  selector: "app-debito-financeiro",
  templateUrl: "./debito-financeiro.component.html",
  styleUrls: ["./debito-financeiro.component.css"],
})
export class DebitoFinanceiroComponent  extends RelatorioTemplateService implements OnInit {

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
    super.print("RelatorioDebitoFinanceiro.jasper");
  }

}
