import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TiendaModel } from '../model/tienda-model';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(private httpClient: HttpClient) {

   }

   getTiendas(): Observable<TiendaModel[]>{
    return this.httpClient.get<TiendaModel[]>('http://localhost:8080/api/v1/tienda'+ '/list');
   }

   saveTienda(request: any): Observable<any>{
    return this.httpClient.post<any>('http://localhost:8080/api/v1/tienda'+ '/save', request);
   }

   updateTiendas(request: any): Observable<any>{
    return this.httpClient.post<any>('http://localhost:8080/api/v1/tienda'+ '/update', request);
   }

   deleteTiendas(id: number): Observable<any>{
    return this.httpClient.get<any>('http://localhost:8080/api/v1/tienda'+ '/delete/'+ id);
   }

}
