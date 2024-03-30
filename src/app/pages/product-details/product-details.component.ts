import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  id: string= ''; 
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.id = this.route.snapshot.queryParams['id'];
  }

}
