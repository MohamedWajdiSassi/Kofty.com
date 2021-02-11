import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListcategorieComponent } from './Categorie/listcategorie.component';
import { ListproduitComponent } from './produit/listproduit.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AlertModule } from 'ngx-bootstrap';
import { ListmagasinComponent } from './Magasin/listmagasin.component';
import { ListMPComponent } from './MagasinProduct/list-mp.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PromotionComponent } from './promo/promotion/promotion.component';




@NgModule({
  declarations: [
    AppComponent,
    ListcategorieComponent,
    ListproduitComponent,
    ListmagasinComponent,
    ListMPComponent,
    NavbarComponent,
    PromotionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AlertModule.forRoot()

  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
