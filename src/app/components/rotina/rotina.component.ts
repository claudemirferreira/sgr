import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rotina',
  templateUrl: './rotina.component.html',
  styleUrls: ['./rotina.component.css']
})
export class RotinaComponent implements OnInit {

  idPerfil: number;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(
      (queryParams: any) =>{
        this.idPerfil = queryParams['idPerfil'];
      }
    )
  }

}
