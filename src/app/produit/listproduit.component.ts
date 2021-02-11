import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitService } from '../produitService';
import { Produit } from '../models/Produit.model';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-listproduit',
  templateUrl: './listproduit.component.html',
  styleUrls: ['./listproduit.component.scss']
})
export class ListproduitComponent implements OnInit {
  produit: Produit[];
  cart_products = [];
  productsLoaded: boolean = false;
  search = "";

  constructor(private produitService: ProduitService,
    private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.produitService.getProduitList().subscribe(data => {
      if(data) {
        console.log(data);
        this.productsLoaded = true;
        this.produit = data;
      }
      if(JSON.parse(localStorage.getItem('cart_products'))) {
        this.cart_products = JSON.parse(localStorage.getItem('cart_products'));
      }
    });
  }
  
  Addcart(product){
    let i;
    let item = {product: product, quantity: 0};
    this.cart_products.forEach((prod, index) => {
      if(prod.product.idProduit === product.idProduit) {
        item = prod;
        i = index;
        console.log(item);
      }
    });

    if(item.quantity != 0) {
      item.quantity++;
      this.cart_products[i] = item;
    } else {
      item.quantity = 1;
      this.cart_products.push(item);
    }
    localStorage.setItem('cart_products', JSON.stringify(this.cart_products));

    this.appComponent.cart = JSON.parse(localStorage.getItem('cart_products')).length;
  }
}
