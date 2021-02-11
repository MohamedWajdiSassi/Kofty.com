import { Component, OnInit } from '@angular/core';
import { MagasinProduct } from '../models/MagsinProduct.model';
import { MPService } from '../MPService';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-list-mp',
  templateUrl: './list-mp.component.html',
  styleUrls: ['./list-mp.component.scss']
})
export class ListMPComponent implements OnInit {

  listMagasinProduit = [];
  cart_products = [];
  cart_mag = [];
  m1=0;
  m2=0;
  m3=0;
  m4=0;
  totals = [{total: 0, magasin: ''}];

  basic = false;
  
  productsLoaded: boolean = false;

  constructor(private mPService: MPService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appComponent: AppComponent) { 
	 
  }

  ngOnInit() {
    this.reloadData();
    this.activatedRoute.params.subscribe(params => {
      if(params['base']=='basic') {
        this.basic = true;
      } else {
        this.basic = false;
      }
    });
  }

  clearCart() {
    localStorage.removeItem('cart_products');
    this.router.navigate(['/produit']);
  }


  reloadData() {
    this.mPService.getmgasinList().subscribe(data => {
      if(data) {
        console.log(data);
        this.listMagasinProduit = data;
        this.productsLoaded = true;
        this.loadCart();
      }
    });
  }

  loadCart() {
    this.cart_mag = [];
    this.cart_products = JSON.parse(localStorage.getItem('cart_products'));
    console.log(this.cart_products);
    this.cart_products.forEach(product => {
      //console.log(product.idProduit);
      this.listMagasinProduit.forEach(mp => {
        //console.log(mp.produit.idProduit == product.idProduit);
        if(mp.produit.idProduit == product.product.idProduit) {
          let itemJson = {mp: mp, prod: product};
          this.cart_mag.push(itemJson);
        }
      });
    })
    this.calculTotal();
    this.calculLowest();
    console.log(this.cart_mag);
    //console.log(this.m1);
  }

  calculTotal() {
    this.m1=0;this.m2=0;this.m3=0;this.m4=0;
    this.cart_mag.forEach(mp => {
      if(mp.mp.productToMagasins[0].promotion != null) {
        let promo = mp.mp.productToMagasins[0].promotion;
        if(promo.typePromo == 1) {
          this.m1 = this.m1 + (mp.mp.productToMagasins[0].prix*mp.prod.quantity);
        } else if(promo.typePromo == 2) {
          this.m1 = this.m1 + (mp.mp.productToMagasins[0].prix*0.5*mp.prod.quantity);
        } else if(promo.typePromo == 3) {
          this.m1 = this.m1 + (mp.mp.productToMagasins[0].prix*mp.prod.quantity) - mp.mp.productToMagasins[0].prix*0.2;
        } else if(promo.typePromo == 4) {
          this.m1 = this.m1 + (mp.mp.productToMagasins[0].prix*mp.prod.quantity);
        }
      } else {
        this.m1 = this.m1 + (mp.mp.productToMagasins[0].prix*mp.prod.quantity);
      }

      if(mp.mp.productToMagasins[1].promotion != null) {
        let promo = mp.mp.productToMagasins[1].promotion;
        if(promo.typePromo == 1) {
          this.m2 = this.m2 + (mp.mp.productToMagasins[1].prix*mp.prod.quantity);
        } else if(promo.typePromo == 2) {
          this.m2 = this.m2 + (mp.mp.productToMagasins[1].prix*0.5*mp.prod.quantity);
        } else if(promo.typePromo == 3) {
          this.m2 = this.m2 + (mp.mp.productToMagasins[1].prix*mp.prod.quantity) - mp.mp.productToMagasins[1].prix*0.2;
        } else if(promo.typePromo == 4) {
          this.m2 = this.m2 + (mp.mp.productToMagasins[1].prix*mp.prod.quantity);
        }
      } else {
        this.m2 = this.m2 + (mp.mp.productToMagasins[1].prix*mp.prod.quantity);
      }

      if(mp.mp.productToMagasins[2].promotion != null) {
        let promo = mp.mp.productToMagasins[2].promotion;
        if(promo.typePromo == 1) {
          this.m3 = this.m3 + (mp.mp.productToMagasins[2].prix*mp.prod.quantity);
        } else if(promo.typePromo == 2) {
          this.m3 = this.m3 + (mp.mp.productToMagasins[2].prix*0.5*mp.prod.quantity);
        } else if(promo.typePromo == 3) {
          this.m3 = this.m3 + (mp.mp.productToMagasins[2].prix*mp.prod.quantity) - mp.mp.productToMagasins[2].prix*0.2;
        } else if(promo.typePromo == 4) {
          this.m3 = this.m3 + (mp.mp.productToMagasins[2].prix*mp.prod.quantity);
        }
      } else {
        this.m3 = this.m3 + (mp.mp.productToMagasins[2].prix*mp.prod.quantity);
      }

      if(mp.mp.productToMagasins[3].promotion != null) {
        let promo = mp.mp.productToMagasins[3].promotion;
        if(promo.typePromo == 1) {
          this.m4 = this.m4 + (mp.mp.productToMagasins[3].prix*mp.prod.quantity);
        } else if(promo.typePromo == 2) {
          this.m4 = this.m4 + (mp.mp.productToMagasins[3].prix*0.5*mp.prod.quantity);
        } else if(promo.typePromo == 3) {
          this.m4 = this.m4 + (mp.mp.productToMagasins[3].prix*mp.prod.quantity) - mp.mp.productToMagasins[3].prix*0.2;
        } else if(promo.typePromo == 4) {
          this.m4 = this.m4 + (mp.mp.productToMagasins[3].prix*mp.prod.quantity);
        }
      } else {
        this.m4 = this.m4 + (mp.mp.productToMagasins[3].prix*mp.prod.quantity);
      }

      /*this.m2 = this.m2 + (mp.mp.productToMagasins[1].prix*mp.prod.quantity);
      this.m3 = this.m3 + (mp.mp.productToMagasins[2].prix*mp.prod.quantity);
      this.m4 = this.m4 + (mp.mp.productToMagasins[3].prix*mp.prod.quantity);*/
    });
  }

  calculLowest() {
    this.totals = [{total: this.m1, magasin: 'carrefour'}, {total: this.m2, magasin: 'geant'}, {total: this.m3, magasin: 'aziza'}, {total: this.m4, magasin: 'mg'}];
    this.totals.sort((a,b) => a.total-b.total);
    console.log(this.totals);
  }

  Addcart(mp){
    mp.prod.quantity++;
    localStorage.setItem('cart_products', JSON.stringify(this.cart_products));
    this.reloadData();
    this.appComponent.cart = JSON.parse(localStorage.getItem('cart_products')).length;
  }

  Removecart(mp){
    if(mp.prod.quantity > 1) {
      mp.prod.quantity--;
      localStorage.setItem('cart_products', JSON.stringify(this.cart_products));
      this.reloadData();
      this.appComponent.cart = JSON.parse(localStorage.getItem('cart_products')).length;
    }
  }

  removeFromCart(i) {
    console.log(this.cart_products);
    console.log(i);
    this.cart_products.splice(i,1);
    console.log(this.cart_products);
    localStorage.setItem('cart_products', JSON.stringify(this.cart_products));
    this.reloadData();
  }
 
}