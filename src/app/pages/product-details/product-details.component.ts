import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Prodotto } from 'src/app/model/prodotto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  apiUrl = 'http://localhost:8080/api/prodotti'; // Modifica con l'URL effettivo della tua API
  productId: string | undefined;
  product: Prodotto | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
      this.productId = this.route.snapshot.queryParams['id']; // Ottieni l'ID del prodotto dalla URL
        this.getProdottoById();
    ;
  }
  getProdottoById(): void {
    const url = `http://localhost:8080/api/prodotti/details?id=${this.productId}`;
  
    this.http.get<Prodotto[]>(url).subscribe(
      (response) => {
        console.log(response);
        this.product = response[0];
        console.log(this.product);
      },
      (error) => {
        console.error('Errore durante il recupero dei prodotti:', error);
      }
    );
  }

  getProductById(productId: string): void {
    this.http.get<Prodotto>(`${this.apiUrl}/${productId}`)
      .subscribe(product => {
        this.product = product;
      });
  }
  
  addToCart(): void {
    // TODO Invia una richiesta al tuo API per aggiungere il prodotto al carrello
    console.log('Prodotto aggiunto al carrello!');
  }
}
