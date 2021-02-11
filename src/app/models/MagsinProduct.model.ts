import { Produit } from './Produit.model';
import { Magasin } from './Magasin.model';

export class MagasinProduct {
    idMagasinProduct : number ;
    
    produits: Produit[];
    Prix : number ;
    magasins: Magasin[];


}