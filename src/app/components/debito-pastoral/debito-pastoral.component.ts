import { NgxUiLoaderService } from "ngx-ui-loader";
import { RelatorioService } from "./../../services/relatorio.service";
import { SharedService } from "./../../services/shared.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { RelatorioTemplateService } from 'src/app/services/relatorio-template.service';

@Component({
  selector: "app-debito-pastoral",
  templateUrl: "./debito-pastoral.component.html",
  styleUrls: ["./debito-pastoral.component.css"],
})
export class DebitoPastoralComponent extends RelatorioTemplateService implements OnInit {

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
    super.print("RelatorioDebitoPastoral.jasper");
  }

}
