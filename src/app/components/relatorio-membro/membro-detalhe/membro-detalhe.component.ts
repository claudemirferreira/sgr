import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MembroService } from 'src/app/services/membro.service';
import { ResponseApi } from 'src/app/model/response-api';
import { Membro } from 'src/app/model/membro';
import { FiltroDto } from 'src/app/model/filtro-dto';
import { RelatorioService } from 'src/app/services/relatorio.service';

@Component({
  selector: 'app-membro-detalhe',
  templateUrl: './membro-detalhe.component.html',
  styleUrls: ['./membro-detalhe.component.css']
})
export class MembroDetalheComponent implements OnInit {

  @ViewChild('pdfViewer', { static: false }) 
  public pdfViewer;

  membro: Membro;
  filtroDto: FiltroDto;
  message: {};  
  classCss: {};

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: MembroService,
    private relatorioService: RelatorioService) { }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['idMembro'];
      console.log('id =====================' + id);
      if (!id)
        return;
      this.service.getMembro(id).subscribe((responseApi: ResponseApi) => {
        this.membro = responseApi['data'];
      }, err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
    });
  }

  gerarRelatorio() {
    this.filtroDto = new FiltroDto();
    this.filtroDto.nomeRelatorio = 'RelatorioFichaMembro.jasper'; 
    this.filtroDto.idMembro = this.membro.idMembro;
    this.relatorioService.geraPdf(this.filtroDto).subscribe((res) => {
      this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
      this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true;
  }

}
