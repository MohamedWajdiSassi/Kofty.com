import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MagasinService} from '../MagasinService';
import { Magasin } from '../models/Magasin.model';
import { ProduitService } from '../produitService';



@Component({
  selector: 'app-listmagasin',
  templateUrl: './listmagasin.component.html',
  styleUrls: ['./listmagasin.component.scss']
})
export class ListmagasinComponent implements OnInit {
  magasin: Magasin[];
  productsLoaded: boolean = false;

  constructor(private MagasinService: MagasinService,
    private produitService: ProduitService) {
	 
  }

  ngOnInit() {
    this.reloadData();
  }


  reloadData() {
    this.produitService.getProduitList().subscribe(data => {
      if(data) {
        console.log(data);
        this.productsLoaded = true;
        this.magasin = data;
      }
    });
  }
}