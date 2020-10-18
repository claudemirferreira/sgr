import { NgxUiLoaderService } from "ngx-ui-loader";
import { Component, OnInit, ViewChild } from "@angular/core";
import { RelatorioService } from "src/app/services/relatorio.service";
import { SharedService } from "src/app/services/shared.service";
import { Router } from "@angular/router";
import { RelatorioTemplateService } from 'src/app/services/relatorio-template.service';

@Component({
  selector: "app-saldo-congregacao",
  templateUrl: "./saldo-congregacao.component.html",
  styleUrls: ["./saldo-congregacao.component.css"],
})
export class SaldoCongregacaoComponent  extends RelatorioTemplateService implements OnInit {

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
    super.print("RelatorioSaldoCongregacao.jasper");
  }

}
