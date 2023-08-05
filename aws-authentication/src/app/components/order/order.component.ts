import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {CognitoService} from "../../services/cognito.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  //array to store the orders from the lambda function Aws
  orderArr: any;
  userEmail: string='';

  constructor(private orderService: OrderService, //inject OrderService
              private cognitoService: CognitoService) {
  }

  public ngOnInit(): void{

    this.userEmail = this.cognitoService.getUserEmail();

    // Subscribe to the retrieveAllOrders method from the OrderService to get order data
      this.orderService.retrieveALlOrders().subscribe(
        (resp) => {
          // Store the order data in the orderArr variable
          this.orderArr = resp;
          //console.log(this.orderArr);
        }
      )
  }


}
