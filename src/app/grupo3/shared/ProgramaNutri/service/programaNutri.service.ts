import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cardapio, DadosPaciente, ListarCardapios, ResponseDadosPaciente, ResponseListarCardapios} from '../model/programaNutri.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProgramaNutriService {

  constructor(private http: HttpClient) { }

  private readonly API = 'http://localhost:8080/programa-nutricional';

  private readonly API2 = 'http://localhost:8080/cardapio';

  private readonly API3 = 'http://localhost:8080/listar-refeicoes';

  getExibirDadosPaciente(idUsuario: number) {
  //  return this.http.get<ResponseDadosPaciente>(this.API+idUsuario);
    const URL = `${this.API}/${idUsuario}`;
    return this.http.get<DadosPaciente>(URL); 
 }

criarCardapio(request: Cardapio): Observable<Cardapio> {
  return this.http.post<Cardapio>(this.API2, request);
}

getListarCardapios(idUsuario: number) {
  const URL = `${this.API3}/${idUsuario}`;
  return this.http.get<ResponseListarCardapios[]>(URL); 
}

}