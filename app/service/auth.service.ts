import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serviceUrl = "http://localhost:8000/api/item";

  constructor(private http:HttpClient) { }

  getItem(){
    return this.http.get(this.serviceUrl)
  }

  createItem(item:any){
    return this.http.post(this.serviceUrl,item)
  }

  updateItem(id:string, item:any){
    return this.http.put(`${this.serviceUrl}/${id}`,item)
  }

  deleteItem(id:string){
    return this.http.delete(`${this.serviceUrl}/${id}`);

  }


}
