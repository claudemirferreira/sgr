import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RelatorioService } from "./../../services/relatorio.service";
import { SharedService } from "./../../services/shared.service";
import {
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { RelatorioTemplateService } from 'src/app/services/relatorio-template.service';

@Component({
  selector: "app-debito-secretaria",
  templateUrl: "./debito-secretaria.component.html",
  styleUrls: ["./debito-secretaria.component.css"],
})
export class DebitoSecretariaComponent  extends RelatorioTemplateService implements OnInit {

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
    super.print("RelatorioDebitoSecretaria.jasper");
  }

}
