import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private http: HttpClient){
  }

  ngOnInit(): void {
    this.getInfo();
  }
  data: any;


  getInfo(){
    return this.http.get<any>('https://jsonplaceholder.typicode.com/posts/1').subscribe(data => {
      this.data = data;
      console.log(this.data)
    });
  }
}
