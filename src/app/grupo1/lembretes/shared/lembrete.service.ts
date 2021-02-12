import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ResponseLembretes, Lembrete, ResponseLembrete, LembreteIntervalo, ResponseLembreteIntervalo, ResponseLembretesIntervalo } from './lembrete.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  constructor(private http: HttpClient) { }

  private readonly API = 'http://localhost:8080/lembrete';

  getLembretes() {
    return this.http.get<ResponseLembretes[]>(this.API);
  }

  getIntervalosLembretes() {
    const URL = `${this.API}/intervalos`

    return this.http.get<ResponseLembretesIntervalo[]>(URL);
  }

  createLembrete(request: Lembrete): Observable<Lembrete> {
    return this.http.post<Lembrete>(this.API, request);
  }

  getLembrete(id: string): Observable<ResponseLembrete> {
    const URL = `${this.API}/${id}`

    return this.http.get<ResponseLembrete>(URL);
  }

  getLembretesByUsuario(idUsuario: string): Observable<ResponseLembretes[]> {
    const URL = `${this.API}/user/${idUsuario}`

    return this.http.get<ResponseLembretes[]>(URL);
  }

  updateLembrete(id: string, request: Lembrete): Observable<Lembrete> {
    const URL = `${this.API}/${id}`
    
    return this.http.put<Lembrete>(URL, request);
  }

  deleteLembrete(idLembrete: number): Observable<any> {
    const URL = `${this.API}/${idLembrete}`;
    
    return this.http.delete<any>(URL);
  }
}
