import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string = '1uFiHlmffgTz7PpyOiEtTxoFkNukC2Xe';

  private _historial: string[] =[];

   
  public resultados: Gif[] = [];
  
  get historial(){
    return this._historial;
  }

  constructor(private  http: HttpClient){
   
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
/* 
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    } */
     
  }

  buscarGifs(query: string=''){
    
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial)); // json.stringify convierte un objeto en string
    }

   

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=1uFiHlmffgTz7PpyOiEtTxoFkNukC2Xe&q=${ query }&limit=10`)
      .subscribe((resp:SearchGifsResponse)=>{
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));

      });

  }
}
