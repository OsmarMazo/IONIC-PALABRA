import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  public apiUrl = 'http://127.0.0.1:8000/api/records';

  constructor(public http: HttpClient) { 

  }
  createRecord(Record:{nombreJugador:String, email:String, nivelJuego:String, tiempo: Number }): Observable<any>{
    return this.http.post(this.apiUrl, Record);
  }

}
