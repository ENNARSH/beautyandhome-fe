import { Component, OnInit } from '@angular/core';
import { Prodotto } from 'src/app/model/prodotto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Prodotto[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cart = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
  }

  removeProduct(prodotto: Prodotto) {
    if (prodotto !== undefined) {
      const cartProduct = this.cart.find((obj) => obj.id === prodotto.id);
      if (
        cartProduct?.quantitaInCarrello &&
        cartProduct?.quantitaInCarrello != 1
      ) {
        cartProduct.quantitaInCarrello = cartProduct.quantitaInCarrello - 1;
      } else {
        const index = this.cart.indexOf(prodotto);
        if (index !== -1) {
          this.cart.splice(index, 1);
        }
      }
      sessionStorage.setItem('cartItems', JSON.stringify(this.cart));
    }
  }
}
