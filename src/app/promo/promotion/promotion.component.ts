import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/models/Produit.model';
import { ProduitService } from 'src/app/produitService';
import { AppComponent } from 'src/app/app.component';
import { MagasinProduct } from 'src/app/models/MagsinProduct.model';
import { MPService } from 'src/app/MPService';
import { PrefixNot } from '@angular/compiler';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  produit;
  cart_products = [];
  productsLoaded: boolean = false;

  constructor(private magasinProduct: MPService,
    private appComponent: AppComponent) {
	 
  }

  ngOnInit() {
    this.reloadData();
  }


  reloadData() {
    this.magasinProduct.getmgasinList().subscribe(data => {
      if(JSON.parse(localStorage.getItem('cart_products'))) {
        this.cart_products = JSON.parse(localStorage.getItem('cart_products'));
      }
      if(data) {
        console.log(data);
        this.produit = data;
        this.productsLoaded = true;
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

  lowestPrice(p) {
    let prix = 0;
    let totals = [];

    p.productToMagasins.forEach(mp => {
      let m1=0;
      if(mp.promotion != null) {
        let promo = mp.promotion;
        if(promo.typePromo == 1) {
          m1 = m1 + (mp.prix);
        } else if(promo.typePromo == 2) {
          m1 = m1 + (mp.prix*0.5);
        } else if(promo.typePromo == 3) {
          m1 = m1 + (mp.prix) - mp.prix*0.2;
        } else if(promo.typePromo == 4) {
          m1 = m1 + (mp.prix);
        }
      } else {
        m1 = m1 + (mp.prix);
      }
      totals.push(m1)
    });

    //totals = [p.productToMagasins[0].prix, p.productToMagasins[1].prix, p.productToMagasins[2].prix, p.productToMagasins[3].prix];
    totals.sort((a,b) => a-b);
    prix = totals[0];
    console.log(prix)
    return prix;
  }
}
