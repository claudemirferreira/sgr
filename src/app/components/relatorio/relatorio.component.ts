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
  
  @ViewChild('pdfViewerOnDemand',{static: false}) pdfViewerOnDemand;
  @ViewChild('pdfViewerAutoLoad',{static: false}) pdfViewerAutoLoad;

  @ViewChild('pdfSrc',{static: false}) pdfSrc;

  fileURL ="1111";
  url : '';

  urll = "http://localhost:8080/api/relatorio/pdf";

  ngOnInit() {

  }
  
  constructor(private http: HttpClient,
    private relatorioService: RelatorioService) {
    
}

download(){
  let url = "http://localhost:8080/api/relatorio/pdf";
  this.downloadFile(url);
}

downloadFile1(route: string, filename: string = null): void{

  const baseUrl = "http://localhost:8080/api/relatorio/pdf";
  const token = 'my JWT';
  const headers = new HttpHeaders().set('authorization','Bearer '+token);
  this.http.get(baseUrl,{headers, responseType: 'blob' as 'json'}).subscribe(
      (response: any) =>{
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          
          let u = downloadLink.href.replace("blob:","");
          console.log(u);
          if (filename)
              downloadLink.setAttribute('download', filename);
          document.body.appendChild(downloadLink);
          downloadLink.click();
      }
  )
}

downloadFile(url: string): any {
      return this.http.get(url, { responseType: 'blob' })
          .pipe(
              map((result: any) => {
                  return result;
              })
          );
  }

}
