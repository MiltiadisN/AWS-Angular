import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient //inject HttpClient
  ) { }

  // Method to retrieve JSON data from Lambda through API Gateway AWS
        retrieveALlOrders(){
          return this.http.get(
            'YOUR_API_GATEWAY_URL' //Replace with your API Gateway URL from AWS
          );
        }
}
