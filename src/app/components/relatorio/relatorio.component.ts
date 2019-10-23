import { RelatorioService } from './../../services/relatorio.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  
  @ViewChild('pdfViewerOnDemand', {static: false}) pdfViewerOnDemand;

  @ViewChild('pdfViewerAutoLoad', {static: false}) 
  pdfViewerAutoLoad;
  
  constructor(private http: HttpClient) {
      let url = "http://localhost:8080/api/relatorio/downloadPDF"; // Or your url
      this.downloadFile(url).subscribe(
          (res) => {
              this.pdfViewerAutoLoad.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
              this.pdfViewerAutoLoad.refresh(); // Ask pdf viewer to load/refresh pdf
          }
      );
  }

  ngOnInit() {
  }

  private downloadFile(url: string): any {
        return this.http.get(url, { responseType: 'blob' })
            .pipe(
                map((result: any) => {
                    return result;
                })
            );
    }

  public openPdf() {
    let url = "https://github.com/intbot/ng2-pdfjs-viewer/tree/master/sampledoc/pdf-sample.pdf"; // E.g. http://localhost:3000/api/GetMyPdf
    // url can be local url or remote http request to an api/pdf file. 
    // E.g: let url = "assets/pdf-sample.pdf";
    // E.g: https://github.com/intbot/ng2-pdfjs-viewer/tree/master/sampledoc/pdf-sample.pdf
    // E.g: http://localhost:3000/api/GetMyPdf
    // Please note, for remote urls to work, CORS should be enabled at the server. Read: https://enable-cors.org/server.html

    this.downloadFile(url).subscribe(
    (res) => {
        this.pdfViewerOnDemand.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewerOnDemand.refresh(); // Ask pdf viewer to load/reresh pdf
      }
    );
  }

}