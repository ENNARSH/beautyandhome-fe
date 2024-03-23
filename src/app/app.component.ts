import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'beautyandhome';
 

  constructor(
    private router: Router
    ) {

     }


  redirect(path: string){
    this.router.navigate([path]);
  }
}
