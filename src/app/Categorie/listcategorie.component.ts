import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../categorieService';
import { Categorie } from '../models/Categorie.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listcategorie',
  templateUrl: './listcategorie.component.html',
  styleUrls: ['./listcategorie.component.scss']
})
export class ListcategorieComponent implements OnInit {

  categorie: Categorie[];
  categoriesLoaded: boolean = false;
  typeProd = "";
  sousCatg = "";
  cart_products = [];


  constructor(private categorieService: CategorieService,
    private route: ActivatedRoute) {
	 
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        let nomCatg = params.get('nomCatg');
        this.typeProd = params.get('typeProd');
        this.sousCatg = params.get('sousCatg');
        console.log(this.typeProd);
        console.log(this.sousCatg);
        this.reloadData(nomCatg);
      }
    )
  }


  reloadData(nomCatg) {
    this.categorieService.getCategorieByName(nomCatg).subscribe(data => {
      console.log(data);
      if(data) {
        console.log(data);
        console.log(data.produits[0].sousCategorie);
        this.categoriesLoaded = true;
        this.categorie = data;
      }
    });
    if(JSON.parse(localStorage.getItem('cart_products'))) {
      this.cart_products = JSON.parse(localStorage.getItem('cart_products'));
    }
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

  }
}
