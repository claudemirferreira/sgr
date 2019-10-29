import { ZonaDto } from './../../model/zona-dto';
import { ParamRelatorioDto } from './../../model/param-relatorio-dto';
import { SharedService } from './../../services/shared.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-relatorio-debito',
  templateUrl: './relatorio-debito.component.html',
  styleUrls: ['./relatorio-debito.component.css']
})
export class RelatorioDebitoComponent implements OnInit {

  @ViewChild('pdfViewer', { static: false }) public pdfViewer;
  message: {};
  shared: SharedService;
  dto: ParamRelatorioDto;
  zonas: [];
  zona: ZonaDto;
  nucleos: [];
  classCss: {};

  selectedFood1: string;

  foods: ZonaDto[] = [
    {idZona: '1', nome: 'Nome1'},
    {idZona: '1', nome: 'Nome2'},
    {idZona: '', nome: 'Nome3'}
  ];

  constructor(private http: HttpClient) {
    let url = "http://localhost:8080/api/relatorio/downloadPDF";
    this.downloadFile(url).subscribe(
      (res) => {
        this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
      }
    );
  }

  onFoodSelection1() {
    console.log(this.selectedFood1);
  }

  onSelect(){
    console.log('aaaaaaa = ' + this.selectedFood1);
  }

  private downloadFile(url: string): any {
    return this.http.get(url, { responseType: 'blob' })
      .pipe(
        map((result: any) => {
          return result;
        })
      );
  }

  ngOnInit() {
  }

}