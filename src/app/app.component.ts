import { Component  } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'koftyPrototype';
  cart;
  ngOnInit() {
    if(JSON.parse(localStorage.getItem('cart_products')) != null) {
      this.cart = JSON.parse(localStorage.getItem('cart_products')).length;
    } else {
      this.cart = 0;
    }
  }
}
