import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  newItem:any = {};
  items:any = [];
  editingItem:any = null;

  constructor(private service:AuthService) { }

  ngOnInit(): void {
    this.fetchItem();
  }
  fetchItem() {
    this.service.getItem().subscribe((data)=>{
      this.items = data;
    })
    
  }

  createItem(){
    this.service.createItem(this.newItem).subscribe(()=>{
      this.fetchItem();
      this.newItem = {};
    })
  }

  editItem(item:any){
    this.editingItem = {...item};
  }

  updateItem(){
    if(this.editingItem){
      this.service.updateItem(this.editingItem._id,this.editingItem).subscribe(()=>{
        this.fetchItem();
        this.editingItem = null;
      })
    }
  }

  deleteItem(id:string){
    this.service.deleteItem(id).subscribe(()=>{
      this.fetchItem();
    })

  }

}
