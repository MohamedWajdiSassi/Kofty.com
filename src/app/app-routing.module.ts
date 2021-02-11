import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { ListproduitComponent } from './produit/listproduit.component';
import { ListcategorieComponent } from './Categorie/listcategorie.component';
import { ListMPComponent } from './MagasinProduct/list-mp.component';
import { PromotionComponent } from './promo/promotion/promotion.component';

const routes : Routes =[
 { path: 'produit' , component: ListproduitComponent},
 { path: 'produit-promo' , component: PromotionComponent},
 { path: 'cart/:base' , component: ListMPComponent},
 { path: 'categorie/:nomCatg/:typeProd/:sousCatg' , component: ListcategorieComponent},
 { path: '**',   redirectTo: 'produit'}

];
@NgModule ({

    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}