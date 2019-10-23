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

  constructor(private http: HttpClient) {
    let url = "http://localhost:8080/api/relatorio/downloadPDF";
    this.downloadFile(url).subscribe(
      (res) => {
        this.pdfViewer.pdfSrc = res; // pdfSrc can be Blob or Uint8Array
        this.pdfViewer.refresh(); // Ask pdf viewer to load/refresh pdf
      }
    );
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