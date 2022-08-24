import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from './product.model';

@Injectable({providedIn: 'root'})
export class ProductService {
    constructor(private http: HttpClient , private router:Router) { }
    
    createProduct(name:string,description:string,price:number,category:string){
        const body={
            name:name,
            description:description,
            price:price,
            category:category
        }
        this.http.post<{message:string}>('http://localhost:3000/api/products',body).subscribe((res)=>{
        })
        this.router.navigate(['/products/view'])
    }

    getProducts(){
        return this.http.get<{message:string,products:Product[],totalProducts:number}>('http://localhost:3000/api/products')
    }
    deleteProduct(id:any){
        return  this.http.delete<{message:string}>('http://localhost:3000/api/products/'+id)
    }

    getPost(id:any){
        return this.http.get<{message:string,product:Product}>('http://localhost:3000/api/products/'+id)
    }

    updateProduct(id:any,name:string,description:string,price:number,category:string) {
        const body={
            name:name,
            description:description,
            price:price,
            category:category
        }

        this.http.put<{message:string}>('http://localhost:3000/api/products/'+id,body)
        .subscribe((res)=>{
        })
        this.router.navigate(['/products/view'])
    }
}