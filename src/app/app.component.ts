import { SharedService } from './services/shared.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = ' - Sistema de Gerenciamento de Relatórios';
  isAuthenticated: boolean;
  showTemplate: boolean = false;
  shared : SharedService;

  constructor() {    
    this.shared = SharedService.getInstance();
    this.logoff();
  }

  logoff(){
    this.shared.user = null;
    this.shared.token = "";
    this.isAuthenticated = false;
  }

  async ngOnInit() { 
    this.shared.showTemplate.subscribe(
      show => this.showTemplate = show
    );   
  }  

  showContentWrapper(){
    return {
      'content-wrapper': this.shared.isLoggedIn()
    }
  }
  
}
